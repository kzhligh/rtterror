export const http = async (
  url,
  method = 'GET',
  { headers, body } = { headers: {}, body: {} }
) => {
  const HOST =
    (typeof window === 'undefined'
      ? process.env.HOST
      : process.env.CLIENT_HOST) ?? 'localhost';

  const data = await fetch(`http://${HOST}:5000${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  });

  return data.json();
};
