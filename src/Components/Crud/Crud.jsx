import Styles from './Crud.module.css';
import { useContext, useState } from 'react';
import MenuSelect from '../MenuSelect/MenuSelect';
import { Button } from '@mui/material';
import MenuInputs from '../MenuInputs/MenuInputs';
import { CatalogContext } from '../../Context/CatalogContext';
import useCatalog from '../../Hooks/useCatalog';
import { DataGridTable } from '../DataGridTable/DataGridTable';

export default function Crud() {
  const { catalogTables } = useCatalog();
  const [selectedTable, setSelectedTable] = useState(catalogTables[0]);
  const [rowData, setRowData] = useState({});

  return (
    <div className={Styles.flexContainer}>
      <aside className={`${Styles.menu}`}>
        <MenuSelect
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />
        <div className={Styles.menuBtns}>
          <Button variant='text' className={Styles.menuBtn}>
            Select
          </Button>
          <Button variant='text' className={Styles.menuBtn}>
            Save
          </Button>
          <Button variant='text' className={Styles.menuBtn}>
            Delete
          </Button>
        </div>
        <MenuInputs selectedTable={selectedTable} rowData={rowData} />
      </aside>
      <main className={` ${Styles.main}  `}>
        {selectedTable && (
          <DataGridTable
            selectedTable={selectedTable}
            setRowData={setRowData}
          />
        )}
      </main>
    </div>
  );
}
