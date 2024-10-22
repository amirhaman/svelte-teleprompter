import { FirebaseError } from '@firebase/util'
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { auth as adminAuth } from '$lib/firebase-admin';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
  default: async (event: RequestEvent) => {
    const { request, cookies } = event;
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    //getAuth, 
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { auth } = await import('$lib/firebase');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const expiresIn =  3.6e+6 // 3.6e+6 : 1 hour | 60 * 60 * 24 * 5 * 1000: 5 days
      const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

      const options = { maxAge: expiresIn / 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' };
      cookies.set('session', sessionCookie, options);
      return { success: true, user: JSON.stringify(userCredential) };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return fail(400, { success: false, message: error.code});
      } else {
        return fail(400, { success: false});
      }
    }
  },
};