import { Button } from '@mui/material';
import { useContext } from 'react';
import { InputSelectContext } from '../../Context/inputSelectContext';
import { TableContext } from '../../Context/TableContext';
import useQuery from '../../Hooks/useQuery';
import useCatalog from '../../Hooks/useCatalog';

import MenuSelect from '../MenuSelect/MenuSelect';
import MenuInputs from '../MenuInputs/MenuInputs';

export default function Menu({ setState }) {
  const { actualSelectionData } = useContext(InputSelectContext);
  const { selectedTable } = useContext(TableContext);
  const { tableInputs } = useCatalog(selectedTable);
  const { runQuery } = useQuery();

  // Verificar si la clave primaria no está vacía; si está vacía, la consulta es un INSERT en lugar de un UPDATE
  async function doSave() {
    const primaryKeyInputs = tableInputs.filter(
      (input) =>
        input.constraint_type === 'PRIMARY KEY' ||
        input.constraint_type === 'ambas',
    );

    const primaryKeyValues = primaryKeyInputs.map(
      (input) => actualSelectionData[input.fieldName],
    );

    // Realizar consulta de INSERT
    if (primaryKeyValues.some((value) => !value)) {
      let query = `INSERT INTO ${selectedTable} (`;
      let values = '';

      for (let i = 0; i < tableInputs.length; i++) {
        const input = tableInputs[i];
        if (primaryKeyInputs.length > 1) {
          if (
            input.fieldName === primaryKeyInputs[0].fieldName ||
            input.fieldName === primaryKeyInputs[1].fieldName
          ) {
            continue;
          }
        }

        if (input.is_serial) {
          continue;
        }

        query += input.fieldName;
        if (i < tableInputs.length - 1) {
          query += ', ';
        }
        values += `'${actualSelectionData[input.fieldName]}'`;
        if (i < tableInputs.length - 1) {
          values += ', ';
        }
      }

      query += `) VALUES (${values})`;

      await runQuery(query);
      setState((prev) => !prev);
    }
    // Realizar consulta de UPDATE
    else {
      let query = `UPDATE ${selectedTable} SET `;

      for (let i = 0; i < tableInputs.length; i++) {
        const input = tableInputs[i];
        if (primaryKeyInputs.length > 1) {
          if (
            input.fieldName === primaryKeyInputs[0].fieldName ||
            input.fieldName === primaryKeyInputs[1].fieldName
          ) {
            continue;
          }
        }

        if (input.is_serial) {
          continue;
        }

        query += `${input.fieldName} = '${
          actualSelectionData[input.fieldName]
        }'`;
        if (i < tableInputs.length - 1) {
          query += ', ';
        }
      }

      query += ` WHERE `;
      for (let i = 0; i < primaryKeyInputs.length; i++) {
        const primaryKeyInput = primaryKeyInputs[i];
        const primaryKeyValue = actualSelectionData[primaryKeyInput.fieldName];
        query += `${primaryKeyInput.fieldName} = '${primaryKeyValue}'`;
        if (i < primaryKeyInputs.length - 1) {
          query += ` AND `;
        }
      }

      await runQuery(query);
      setState((prev) => !prev);
    }
  }

  async function doDelete() {
    const primaryKeyInputs = tableInputs.filter(
      (input) =>
        input.constraint_type === 'PRIMARY KEY' ||
        input.constraint_type === 'ambas',
    );

    const primaryKeyValues = primaryKeyInputs.map(
      (input) => actualSelectionData[input.fieldName],
    );

    if (primaryKeyValues.every((value) => value)) {
      let query = `DELETE FROM ${selectedTable} WHERE `;

      for (let i = 0; i < primaryKeyInputs.length; i++) {
        const primaryKeyInput = primaryKeyInputs[i];
        const primaryKeyValue = actualSelectionData[primaryKeyInput.fieldName];
        query += `${primaryKeyInput.fieldName} = '${primaryKeyValue}'`;
        if (i < primaryKeyInputs.length - 1) {
          query += ` AND `;
        }
      }

      await runQuery(query);
      setState((prev) => !prev);
    } else {
      console.log('One or more primary key values are missing.');
    }
  }

  return (
    <>
      <MenuSelect />
      <div>
        <Button onClick={doSave} variant='text'>
          Save
        </Button>
        <Button onClick={doDelete} variant='text'>
          Delete
        </Button>
      </div>
      <MenuInputs />
    </>
  );
}
