import { authOptions } from './authOptions';
import { getServerSession as getNextServerSession } from 'next-auth';

export const getServerSession = () => getNextServerSession(authOptions);
