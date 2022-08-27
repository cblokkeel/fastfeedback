import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: process.env.NEXT_FIREBASE_PRIVATE_KEY,
      client_email: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
  });
}

export default admin.firestore();
