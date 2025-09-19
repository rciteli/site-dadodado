import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/libs/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Dev Login',
      credentials: { email: { label: 'Email', type: 'email' }, name: { label: 'Nome', type: 'text' } },
      async authorize(creds) {
        const email = (creds?.email || '').toString().toLowerCase().trim();
        const name = (creds?.name || '').toString().trim() || email.split('@')[0];
        if (!email) return null;
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) user = await prisma.user.create({ data: { email, name } });
        return { id: user.id, email: user.email, name: user.name ?? undefined };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { if (user?.id) token.uid = user.id; return token; },
    async session({ session, token, user }) {
      // se vier do token:
      if (token?.sub) (session.user as any).id = token.sub;

      // ou se estiver usando DB e o objeto user tem id:
      if (user?.id) (session.user as any).id = user.id;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
