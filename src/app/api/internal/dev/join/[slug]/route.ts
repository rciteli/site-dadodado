import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/libs/prisma';

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const session = await getServerSession(authOptions);
  const uid = (session as any)?.uid as string | undefined;
  if (!uid) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  // upsert do Client
  let client = await prisma.client.findUnique({ where: { slug } });
  if (!client) {
    client = await prisma.client.create({ data: { slug, name: slug } });
  }

  // membership do usuário nesse client (OWNER)
  const membership = await prisma.membership.findFirst({
    where: { userId: uid, clientId: client.id },
  });
  if (!membership) {
    await prisma.membership.create({ data: { userId: uid, clientId: client.id, role: 'OWNER' } });
  }

  // pelo menos uma Account padrão (se não existir)
  const account = await prisma.account.findFirst({ where: { clientId: client.id } })
    ?? await prisma.account.create({ data: { clientId: client.id, name: 'Principal', platform: 'generic' } });

  // acesso do usuário à account
  const access = await prisma.accountAccess.findFirst({ where: { userId: uid, accountId: account.id } });
  if (!access) {
    await prisma.accountAccess.create({ data: { userId: uid, accountId: account.id, role: 'OWNER' } });
  }

  return NextResponse.json({ ok: true, slug, clientId: client.id, accountId: account.id });
}
