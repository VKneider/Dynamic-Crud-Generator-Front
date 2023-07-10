import { useState } from 'react';
import axios from 'axios';
import config from '../config';

const myAxios = axios.create({
  baseURL: config.API_URL,
  timeout: 3500,
});

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const doRequest = async (requestConfig) => {
    try {
      const { url, method } = requestConfig;

      const res = await myAxios[method.toLowerCase()](url, {
        ...requestConfig,
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, doRequest };
};

export default useAxios;
