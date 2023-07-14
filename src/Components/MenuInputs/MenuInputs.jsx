import { useContext, useEffect } from 'react';
import { TableContext } from '../../Context/TableContext';
import useCatalog from '../../Hooks/useCatalog';
import Input from '../Input/Input';
import MyInputSelect from '../MyInputSelect/MyInputSelect';
import { InputSelectContext } from '../../Context/inputSelectContext';

export default function MenuInputs() {
  const { selectedTable, selectedRowData, setSelectedRowData } =
    useContext(TableContext);
  const { tableInputs } = useCatalog(selectedTable);
  const { inputSelectData, actualSelectionData, handleSelectionDataChange } =
    useContext(InputSelectContext);

  useEffect(() => {
    return () => {
      setSelectedRowData({});
    };
  }, [selectedTable]);

  return (
    <div>
      {tableInputs.map((inputData, idx) => {
        if (
          inputData.constraint_type === 'FOREIGN KEY' ||
          inputData.constraint_type === 'ambas'
        ) {
          return (
            <MyInputSelect
              key={idx}
              label={inputData.fieldName}
              iterable={inputSelectData[inputData.fieldName]}
              value={actualSelectionData[inputData.fieldName]}
              setter={handleSelectionDataChange}
            />
          );
        } else {
          return (
            <Input
              key={idx}
              inputData={inputData}
              initialValue={selectedRowData[inputData.fieldName]}
            />
          );
        }
      })}
    </div>
  );
}
