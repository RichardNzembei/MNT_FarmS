import { getAuthUser } from '../../utils/auth';

export default defineEventHandler((event) => {
  const user = getAuthUser(event);
  return { user };
});
