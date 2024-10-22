import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';


const serviceAccount = "service-account-file.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://database-name.firebaseio.com'
  });
}

const auth = getAuth();

export { auth };