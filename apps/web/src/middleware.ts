import { NextFetchEvent, NextRequest } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const publicPages = [
  '/sign-in',
  '/sign-up',
  '/forget-password',
  '/email-verification',
];

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/sign-in',
    },
  },
);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req as NextRequestWithAuth, event);
  }
}

// export interface NextRequestWithAuth extends NextRequest {
//   nextauth: { token: JWT | null }
// }

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
