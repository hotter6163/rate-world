import { authOptions } from '../const/authOptions';
import { getServerSession as getNextServerSession } from 'next-auth';

export const getServerSession = () => getNextServerSession(authOptions);
