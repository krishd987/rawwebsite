import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  try {
    const rawKey = process.env.FIREBASE_PRIVATE_KEY ?? '';
    // Normalize: handle literal \n strings, real newlines, and Windows \r\n
    const privateKey = rawKey
      .replace(/\\n/g, '\n')   // literal \n → real newline
      .replace(/\\r/g, '')      // remove literal \r
      .replace(/\r\n/g, '\n')  // Windows CRLF → LF
      .trim();

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error', error);
  }
}

const db = getFirestore();

export { db };
