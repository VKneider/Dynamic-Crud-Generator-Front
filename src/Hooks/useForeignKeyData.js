import { useEffect, useState } from 'react';
import useQuery from './useQuery';

export default function useForeignKeyData() {
  const [data, setData] = useState([]);
  const { rows, status, runQuery } = useQuery();
  const [foreignFieldNames, setForeignFieldNames] = useState([]);

  // eslint-disable-next-line no-unused-vars
  async function fetchData(tableInputs, tableName) {
    const foreignFields = tableInputs.filter(
      (obj) =>
        obj.constraint_type === 'FOREIGN KEY' ||
        obj.constraint_type === 'ambas',
    );

    if (foreignFields.length === 0) return setData([]);

    setForeignFieldNames(foreignFields.map((field) => field.fieldName));

    const foreignFieldNamesString = foreignFields
      .map((field) => field.fieldName)
      .join(', ');

    const query = `SELECT ${foreignFieldNamesString} FROM ${tableName}`;

    await runQuery(query);
  }

  useEffect(() => {
    if (
      status === 'success' &&
      foreignFieldNames &&
      foreignFieldNames.length > 0
    ) {
      const result = [];

      for (const fieldName of foreignFieldNames) {
        const values = new Set();
        for (const row of rows) {
          const value = row[fieldName];
          if (!values.has(value)) {
            values.add(value);
          }
        }
        result.push({ [fieldName]: Array.from(values) });
      }

      setData(result);
    }
  }, [rows]);

  return { data, fetchData };
}
