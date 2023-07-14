import Styles from './Crud.module.css';
import Menu from '../Menu/Menu';
import DataContainer from '../DataContainer/DataContainer';
import { TableContextProvider } from '../../Context/TableContext';
import { InputSelectContextProvider } from '../../Context/inputSelectContext';
import { useState } from 'react';

export default function Crud() {
  const [state, setState] = useState(false);

  return (
    <TableContextProvider>
      <InputSelectContextProvider>
        <div className={Styles.flexContainer}>
          <aside className={`${Styles.menu}`}>
            <Menu setState={setState} />
          </aside>
          <main className={` ${Styles.main}  `}>
            <DataContainer state={state} />
          </main>
        </div>
      </InputSelectContextProvider>
    </TableContextProvider>
  );
}
