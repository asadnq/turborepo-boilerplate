import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { AuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';

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

export const authOptions = {
  providers: [GoogleProvider(authConfig.google)],
  secret: authConfig.secret,
  callbacks: {
    signIn() {
      // TODO: Implement signIn callback
      return true;
    },
  },
} satisfies AuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
