import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { AuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import { db } from '@/db';

const authConfig = z
  .object({
    secret: z.string(),
    google: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
    }),
  })
  .parse({
    secret: process.env.AUTH_SECRET,
    google: {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    },
  });

export const authOptions: AuthOptions = {
  providers: [GoogleProvider(authConfig.google)],
  adapter: DrizzleAdapter(db),
  secret: authConfig.secret,
  callbacks: {
    signIn() {
      // TODO: Implement signIn callback
      return true;
    },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
