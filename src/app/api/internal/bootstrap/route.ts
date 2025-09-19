// app/api/internal/bootstrap/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client'; 

function slugify(s: string) {
  return (
    s
      ?.normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '') || 'cliente'
  );
}

async function getUniqueSlug(base: string) {
  let slug = slugify(base);
  let i = 2;
  while (await prisma.client.findUnique({ where: { slug } })) {
    slug = `${slugify(base)}-${i++}`;
  }
  return slug;
}

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Tente obter o id do usuário da forma mais padrão:
  const userId =
    (session.user as any)?.id ??
    (session as any)?.uid ?? // só se você setou isso nos callbacks
    null;

  const email = session.user?.email ?? null;

  if (!userId && !email) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // 1) Já existe membership? Retorna junto com o slug do cliente.
  const existingMembership = userId
    ? await prisma.membership.findFirst({
        where: { userId },
        include: { client: true },
        orderBy: { createdAt: 'asc' }, // se houver múltiplos, pega o primeiro
      })
    : null;

  if (existingMembership?.client) {
    return NextResponse.json({
      ok: true,
      clientId: existingMembership.clientId,
      slug: existingMembership.client.slug,
    });
  }

  // 2) Não existe membership -> cria um cliente + conta + membership
  const baseName =
    session.user?.name?.trim() ||
    (email ? email.split('@')[0] : '') ||
    'cliente';

  const slug = await getUniqueSlug(baseName);

  const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const client = await tx.client.create({
      data: { name: baseName, slug },
    });

    const account = await tx.account.create({
      data: { clientId: client.id, name: 'Principal', platform: 'generic' },
    });

    // se você não tem uma tabela User no Prisma, mas só o id vindo do auth,
    // está ok usar o `userId` diretamente
    await tx.membership.create({
      data: {
        userId: (userId as string) || 'unknown', // ajuste se necessário
        clientId: client.id,
        role: 'OWNER',
      },
    });

    await tx.accountAccess.create({
      data: {
        userId: (userId as string) || 'unknown',
        accountId: account.id,
        role: 'OWNER',
      },
    });

    return { clientId: client.id, accountId: account.id, slug: client.slug };
  });

  return NextResponse.json({ ok: true, ...result });
}
