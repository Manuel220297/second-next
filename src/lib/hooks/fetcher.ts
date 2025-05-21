// lib/fetcher.ts
export async function fetcher<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    // Attach extra info so you can inspect it in the UI
    const error: any = new Error('Request failed');
    error.status = res.status;
    try {
      error.info = await res.json(); // <- your API might send {message: "..."}
    } catch {
      error.info = await res.text();
    }
    throw error;
  }

  return res.json();
}
