interface RequestMeta extends RequestInit {
  body?: any;
  searchParams?: {
    [key: string | number | symbol]: string;
  };
}

export const http = async <T = any>(
  url: RequestInfo,
  { method, searchParams, ...options }: RequestMeta = {}
): Promise<T> => {
  const HOST =
    (typeof window === 'undefined'
      ? process.env.HOST
      : process.env.CLIENT_HOST) ?? 'localhost';

  const endpoint = new URL(`http://${HOST}:5000${url}`);

  if (searchParams)
    Object.entries(searchParams).forEach((entries) =>
      endpoint.searchParams.append(
        ...(entries.map(encodeURI) as [string, string])
      )
    );

  const data = await fetch(endpoint.href, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: method !== 'GET' ? JSON.stringify(options.body) : undefined,
  });

  if (!data.ok) throw data.json() as Promise<T>;

  return data.json() as Promise<T>;
};
