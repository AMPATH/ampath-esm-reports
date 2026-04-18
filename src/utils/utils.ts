export const getCell = (key = "", label = "", colSpan = 1, rowSpan = 1, strong = false) => ({
    key,
    label,
    strong,
    colSpan,
    rowSpan
});

export async function getJson<T>(url: string, payload: Record<string, unknown> | null = null): Promise<T> {
  let requestUrl = url;

  if (payload && Object.keys(payload).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(payload).filter(([, value]) => value !== undefined && value !== null) as Array<[string, string]>,
    ).toString();

    if (queryString) {
      requestUrl = `${url}?${queryString}`;
    }
  }

  const response = await fetch(requestUrl, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed with ${response.status}: ${errorText}`);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return Promise.resolve({} as T);
  }

  return response.json() as Promise<T>;
}