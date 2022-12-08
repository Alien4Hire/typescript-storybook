export async function getConfig() {
  const response = await fetch('/api/v1/config/client', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response?.status !== 200) {
    throw new Error('something went wrong');
  }

  const config = await response.json();
  return config;
}
