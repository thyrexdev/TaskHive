export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }
  return res;
};
