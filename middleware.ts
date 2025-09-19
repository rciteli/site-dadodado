import { withAuth } from 'next-auth/middleware';

export default withAuth(
  () => { /* ok */ },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = { matcher: ['/dashboard/:path*', '/api/internal/:path*'] };
