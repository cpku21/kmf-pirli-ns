import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: [
    // Protect all admin pages except admin/login
    '/admin/:path*',
  ],
};
