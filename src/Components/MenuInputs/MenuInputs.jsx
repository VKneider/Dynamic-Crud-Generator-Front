import { useContext, useEffect } from 'react';
import { TableContext } from '../../Context/TableContext';
import useCatalog from '../../Hooks/useCatalog';
import Input from '../Input/Input';

export default function MenuInputs() {
  const { selectedTable, selectedRowData, setSelectedRowData } =
    useContext(TableContext);
  const { tableInputs } = useCatalog(selectedTable);

  useEffect(() => {
    return () => {
      setSelectedRowData({});
    };
  }, [selectedTable]);

  return (
    <div>
      {tableInputs.map((inputData, idx) => {
        return (
          <Input
            key={idx}
            inputData={inputData}
            initialValue={selectedRowData[inputData.fieldName]}
            disabled={
              inputData.constraint_type === 'PRIMARY KEY' ||
              inputData.constraint_type === 'ambas'
            }
          />
        );
      })}
    </div>
  );
}
