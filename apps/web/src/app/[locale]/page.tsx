import { auth } from '@/auth';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect('/sign-in');
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container">{JSON.stringify(session.user)}</div>
      <SignOutButton />
    </div>
  );
}
