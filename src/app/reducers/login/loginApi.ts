export async function verifyGoogleUser(token: string) {
  const response = await fetch('/api/v1/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      token,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response?.status !== 200) {
    throw new Error('something went wrong');
  }

  const user = await response.json();
  return { user, token };
}
