import { useContext, useEffect, useState } from 'react';
import { TableContext } from '../../Context/TableContext';
import useCatalog from '../../Hooks/useCatalog';
import Input from '../Input/Input';
import MyInputSelect from '../MyInputSelect/MyInputSelect';
import { InputSelectContext } from '../../Context/inputSelectContext';

export default function MenuInputs() {
  const { selectedTable, selectedRowData, setSelectedRowData } =
    useContext(TableContext);
  const { tableInputs } = useCatalog(selectedTable);
  const {
    inputSelectData,
    actualSelectionData,
    handleSelectionDataChange,
    setActualSelectionData,
  } = useContext(InputSelectContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inputSelectData) {
      setLoading(false);
    }
  }, [inputSelectData]);

  useEffect(() => {
    return () => {
      setSelectedRowData({});
      setActualSelectionData({});
    };
  }, [selectedTable]);

  function getIndexFromInputData(fieldName) {
    for (let i = 0; i < inputSelectData.length; i++) {
      if (fieldName in inputSelectData[i]) {
        return i;
      }
    }
    return -1;
  }

  return (
    <>
      {!loading && (
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
                  iterable={
                    inputSelectData[getIndexFromInputData(inputData.fieldName)]
                  }
                  value={actualSelectionData[inputData.fieldName]}
                  setter={handleSelectionDataChange}
                />
              );
            } else {
              return (
                <Input
                  key={idx}
                  inputData={inputData}
                  setActualSelectionData={setActualSelectionData}
                  initialValue={selectedRowData[inputData.fieldName]}
                />
              );
            }
          })}
        </div>
      )}
    </>
  );
}
