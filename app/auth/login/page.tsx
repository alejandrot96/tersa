import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Login',
  description: 'Enter your email or choose a social provider.',
};

const LoginPage = () => <SignIn />;

export default LoginPage;
