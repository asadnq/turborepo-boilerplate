import Link from 'next/link';
import { SignInForm } from './form';

export default async function SignIn() {
  return (
    <div className="max-w-[380px] sm:max-w-[450px] mx-auto my-auto flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-primary font-bold">Your App Name</h1>
      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <SignInForm />
      </div>
      <span className="text-sm text-foreground">
        Don&apos;t have an account?{' '}
        <Link className="text-primary font-semibold" href="/sign-up">
          Sign up
        </Link>
      </span>
      <span className="text-sm text-foreground">
        Forgot your password?{' '}
        <Link className="text-primary font-semibold" href="/forget-password">
          Reset it
        </Link>
      </span>
    </div>
  );
}
