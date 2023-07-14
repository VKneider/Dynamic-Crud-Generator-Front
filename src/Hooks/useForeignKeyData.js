import { useState } from 'react';
import useQuery from './useQuery';

export default function useForeignKeyData() {
  const [data, setData] = useState([]);
  const { rows, runQuery } = useQuery();

  // eslint-disable-next-line no-unused-vars
  async function fetchData(tableInputs, tableName) {
    const foreignFields = tableInputs.filter(
      (field) =>
        field.constrain_type === 'FOREIGN KEY' ||
        field.constrain_type === 'ambas',
    );
    console.log(tableInputs);
    console.log(foreignFields);
    if (foreignFields.length === 0) return setData([]);

    const foreignFieldNames = foreignFields.map((field) => field.fieldName);
    const foreignFieldNamesString = foreignFieldNames.join(', ');

    const query = `SELECT ${foreignFieldNamesString} FROM ${tableName}`;

    await runQuery(query);

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

  return { data, fetchData };
}
