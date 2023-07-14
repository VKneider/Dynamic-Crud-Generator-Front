import useCatalog from '../../Hooks/useCatalog';
import { useContext } from 'react';
import { TableContext } from '../../Context/TableContext';
import MySelect from '../MySelect/MySelect';

export default function MenuSelect() {
  const { catalogTables } = useCatalog();
  const { selectedTable, setSelectedTable } = useContext(TableContext);

  function handleTableChange(e) {
    setSelectedTable(e.target.value);
  }

  return (
    <MySelect
      label='Tables'
      iterable={catalogTables}
      value={selectedTable}
      setter={handleTableChange}
    />
  );
}
