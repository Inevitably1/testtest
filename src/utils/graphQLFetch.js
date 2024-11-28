async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const result = await response.json();
    return result.data;
  } catch (e) {
    console.error('Error fetching data:', e);
  }
}

export default graphQLFetch;
