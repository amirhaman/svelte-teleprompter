import { type Cookies } from '@sveltejs/kit';
import { auth as adminAuth } from '$lib/firebase-admin';
import { FirebaseError } from '@firebase/util';
import { fail } from '@sveltejs/kit';
import { user } from '../app/stores/user-store';

/** @type {import('./$types').PageLoad} */
export const load = async ({ cookies }: { cookies: Cookies }) => {
	const sessionCookie = cookies.get('session');

	if (sessionCookie) {
		try {
			const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
			const authUser = await adminAuth.getUser(decodedClaims.sub);

			// Check if the token is revoked
			if (
				authUser.tokensValidAfterTime &&
				new Date(authUser.tokensValidAfterTime).getTime() > decodedClaims.auth_time * 1000
			) {
				cookies.set('session', '', { maxAge: -1, path: '/' });
				console.log('seeting user  null=>');
				user.set(null);
				return { user: null };
			}
			user.set(authUser);
			return { user: decodedClaims };
		} catch (error) {
			cookies.set('session', '', { maxAge: -1, path: '/' });
			if (error instanceof FirebaseError) {
        return fail(400, { success: false, message: error.code });
      } else {
        return fail(400, { success: false, message: "unknown error on load" });
      }
		}
	}

	return { user: null };
};
