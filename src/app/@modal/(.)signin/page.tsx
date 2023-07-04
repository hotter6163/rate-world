import { InterceptDialog } from '@/components/InterceptDialog';
import { SignInForm } from '@/components/auth/signin';
import { FC } from 'react';

const SignInIntercept: FC = () => {
  return (
    <InterceptDialog>
      <SignInForm />
    </InterceptDialog>
  );
};

export default SignInIntercept;
