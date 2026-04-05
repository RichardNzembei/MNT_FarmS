import { getHeader, createError } from 'h3';
import admin from 'firebase-admin';
import getFirebaseAdmin from '../firebase';

export const getAuthUser = async (event) => {
  const auth = getHeader(event, 'authorization');
  if (!auth?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  const idToken = auth.slice(7);
  try {
    // Ensure Firebase Admin is initialized
    getFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(idToken);
    return {
      uid: decoded.uid,
      email: decoded.email,
      displayName: decoded.name || decoded.email?.split('@')[0] || 'Farm',
    };
  } catch (e) {
    if (e.statusCode === 401) throw e;
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' });
  }
};
