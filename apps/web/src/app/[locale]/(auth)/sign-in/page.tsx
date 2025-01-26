'use client';

import { Button } from '@repo/ui/components/ui/button';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return <Button onClick={() => signIn('google')}>Sign in with Google</Button>;
}
