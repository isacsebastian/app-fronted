const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8000/graphql';

export async function fetchGraphQL(query: string, variables: Record<string, any> = {}) {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ query, variables }),
  });
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data;
  } catch (e) {
    throw new Error('Respuesta inválida del servidor: ' + text);
  }
}
