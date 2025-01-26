'use client';
import { Button } from '@repo/ui/components/ui/button';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
