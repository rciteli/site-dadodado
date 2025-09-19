import { prisma } from '@/libs/prisma';

export async function assertUserInClient(userId: string, clientSlug: string) {
  const client = await prisma.client.findUnique({ where: { slug: clientSlug } });
  if (!client) throw new Error('not_found');
  const membership = await prisma.membership.findFirst({
    where: { userId, clientId: client.id },
  });
  if (!membership) throw new Error('forbidden');
  return client;
}

export async function assertUserAdminInClient(userId: string, clientSlug: string) {
  const client = await assertUserInClient(userId, clientSlug);
  const membership = await prisma.membership.findFirst({
    where: { userId, clientId: client.id },
    select: { role: true },
  });
  if (!membership || !['OWNER', 'ADMIN'].includes(membership.role)) {
    throw new Error('forbidden');
  }
  return client;
}
