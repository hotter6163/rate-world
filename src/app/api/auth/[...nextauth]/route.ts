import { authOptions } from '@/libs/auth/common/authOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
