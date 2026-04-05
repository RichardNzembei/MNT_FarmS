import getFirebaseAdmin from '../../firebase';
import { getAuthUser } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const authUser = await getAuthUser(event);
  const body = await readBody(event);
  const { firstName } = body || {};

  if (!firstName?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'First name is required' });
  }

  const { firestore } = getFirebaseAdmin();

  // Idempotent — only create if no farm exists for this user
  const existing = await firestore.collection('farms').where('ownerId', '==', authUser.uid).limit(1).get();
  if (!existing.empty) {
    const farm = existing.docs[0].data();
    return { farmName: farm.farmName, farmId: existing.docs[0].id };
  }

  const farmName = `${firstName.trim()}'s Farm`;
  const docRef = await firestore.collection('farms').add({
    ownerId: authUser.uid,
    farmName,
    createdAt: new Date().toISOString(),
  });

  return { farmName, farmId: docRef.id };
});
