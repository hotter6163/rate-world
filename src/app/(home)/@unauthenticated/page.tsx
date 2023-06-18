import Link from 'next/link';
import { FC } from 'react';

const UnauthenticatedPage: FC = () => (
  <div>
    <h1>Public Page</h1>
    <Link href="/signin">Sign In</Link>
  </div>
);

export default UnauthenticatedPage;
