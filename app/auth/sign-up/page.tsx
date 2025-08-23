import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign up',
  description: 'Sign up to your account',
};

const SignUpPage = () => <SignUp />;

export default SignUpPage;
