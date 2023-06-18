import { SignOutButton } from './SignOutButton';
import { FC } from 'react';

const AuthenticatedPage: FC = () => (
  <div>
    <h1>Private Page</h1>
    <SignOutButton />
  </div>
);

export default AuthenticatedPage;
