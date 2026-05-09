import 'server-only';

export function verifyCredentials(username, password) {
  const user1 = process.env.ADMIN_USER_1;
  const pass1 = process.env.ADMIN_PASS_1;
  const user2 = process.env.ADMIN_USER_2;
  const pass2 = process.env.ADMIN_PASS_2;

  if (username === user1 && password === pass1) return { username: user1 };
  if (username === user2 && password === pass2) return { username: user2 };
  return null;
}
