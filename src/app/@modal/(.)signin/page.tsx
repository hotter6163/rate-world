import { InterceptDialog } from '@/components/InterceptDialog';
import { SignInForm } from '@/features/auth';
import { FC } from 'react';

const SignInIntercept: FC = () => {
  return (
    <InterceptDialog>
      <SignInForm isIntercept />
    </InterceptDialog>
  );
};

export default SignInIntercept;
