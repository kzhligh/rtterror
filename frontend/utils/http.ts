interface RequestMeta extends RequestInit {
    body?: any;
    searchParams?: {
        [key: string | number | symbol]: string;
    };
}

export const http = async <T = any>(
    path: RequestInfo,
    {method, searchParams, ...options}: RequestMeta = {}
): Promise<T> => {
    const HOST =
        (typeof window === 'undefined'
            ? process.env.HOST
            : process.env.NEXT_PUBLIC_CLIENT_HOST) ?? 'http://localhost:5000';

    const endpoint = new URL(`${HOST}${path}`);

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

    if (!data.ok) throw new Error(JSON.stringify(data.json()));

    return data.json() as Promise<T>;
};
