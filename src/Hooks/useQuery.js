import { useEffect, useState } from 'react';
import useFetch from './useFetch';

export default function useQuery() {
  const { loading, data, error, fetchData } = useFetch(
    'http://localhost:3003/runCustomQuery',
  );
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const runQuery = async (query) => {
    // eslint-disable-next-line
    await fetchData('POST', { customQuery: query });
  };

  useEffect(() => {
    if (data) {
      const updatedColumns = data.columns.map((input) => {
        return {
          field: input,
          headerName: input,
          editable: false,
          width: 150,
        };
      });

      const updatedRows = data.rows.map((row, index) => {
        row.id = index;
        return row;
      });

      setColumns(updatedColumns);
      setRows(updatedRows);
    }
  }, [data]);

  return { rows, columns, runQuery };
}
