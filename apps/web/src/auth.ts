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

const config = z
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
  providers: [GoogleProvider(config.google)],
  adapter: DrizzleAdapter(db),
  secret: config.secret,
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (trigger === 'update') token.name = session.user.name;
      return token;
    },
    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string,
          randomKey: params.token.randomKey,
        },
      };
    },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
