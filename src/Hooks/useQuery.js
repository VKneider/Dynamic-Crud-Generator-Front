import { useEffect, useState } from 'react';

export default function useQuery(query) {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const url = `http://localhost:3003/runCustomQuery`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customQuery: query }),
        });

        const data = await response.json();
        setResponse(data.result);
      } catch (error) {
        console.error('Error:', error);
        setError(error);
      }
    };
    getResponse();
  }, [query]);

  return { response, error };
}
