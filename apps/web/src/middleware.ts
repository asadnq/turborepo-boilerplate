import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default handleI18nRouting;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|id)/:path*'],
};
