import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { auth as adminAuth } from '$lib/firebase-admin';
import { user } from '../../app/stores/user-store';

export const actions = {
  default: async ({ cookies }: RequestEvent) => {
    const sessionCookie = cookies.get('session');

    if (sessionCookie) {
      try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        await adminAuth.revokeRefreshTokens(decodedClaims.sub);
      } catch (err) {
        console.error('Error revoking tokens:', err);
      }
    }

    // Clear the session cookie
    cookies.set('session', '', { maxAge: -1, path: '/' });

    user.set(null);

    // Redirect to login page or home page
    throw redirect(302, '/login');
  }
};