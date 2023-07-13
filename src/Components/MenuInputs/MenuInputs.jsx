import { useContext, useEffect } from 'react';
import { TableContext } from '../../Context/TableContext';
import useCatalog from '../../Hooks/useCatalog';
import Input from '../Input/Input';

export default function MenuInputs() {
  const { selectedTable, selectedRowData } = useContext(TableContext);
  const { tableInputs } = useCatalog(selectedTable);

  return (
    <div>
      {tableInputs?.map((inputData, idx) => {
        return (
          <Input
            key={idx}
            inputData={inputData}
            initialValue={selectedRowData[inputData.fieldName]}
          />
        );
      })}
    </div>
  );
}
