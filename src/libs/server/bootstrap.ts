// src/libs/server/bootstrap.ts
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

type EnsureArgs = {
  id?: string;      // userId (recomendado)
  email?: string;   // opcional, só para naming do cliente
  name?: string;    // opcional, só para naming do cliente
};

/**
 * Garante que o usuário tenha um Client e retorna o slug.
 * - Se já existir Membership(userId=ID) => retorna client.slug
 * - Se não existir => cria Client + Membership (OWNER) e retorna slug
 */
export async function ensureClientSlugForUser(user: EnsureArgs): Promise<string> {
  const { id, email, name } = user;
  if (!id) throw new Error("ensureClientSlugForUser: user.id ausente");

  // 1) Tenta achar um client via membership
  const membership = await prisma.membership.findFirst({
    where: { userId: id },
    include: { client: true },
  });

  if (membership?.client?.slug) {
    return membership.client.slug;
  }

  // 2) Criar um client + membership em transação
  const base =
    (name || email || "cliente")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "cliente";

  const slug = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // gerar slug único
    let candidate = base;
    let i = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const exists = await tx.client.findUnique({ where: { slug: candidate } });
      if (!exists) break;
      i += 1;
      candidate = `${base}-${i}`;
    }

    const client = await tx.client.create({
      data: {
        name: name || "Novo Cliente",
        slug: candidate,
      },
    });

    await tx.membership.create({
      data: {
        userId: id,
        clientId: client.id,
        role: "OWNER",
      },
    });

    // se tiver um "Account" default na sua modelagem, crie aqui também:
    // await tx.account.create({ data: { clientId: client.id, name: "Principal", platform: "generic" } });

    return client.slug;
  });

  return slug;
}
