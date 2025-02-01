import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function EmailVerification() {
  const t = await getTranslations('EmailVerificationPage');
  return (
    <div className="max-w-[380px] sm:max-w-[450px] mx-auto my-auto flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl text-primary font-bold">Your App Name</h1>
      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Display verification success or error message */}
        <p>{t('checkYourEmail')}</p>
      </div>
      <span className="text-sm text-foreground">
        Go back to{' '}
        <Link className="font-semibold" href="/sign-in">
          Sign In
        </Link>
      </span>
    </div>
  );
}
