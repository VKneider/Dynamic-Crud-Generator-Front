import Styles from './Crud.module.css';
import Menu from '../Menu/Menu';
import DataContainer from '../DataContainer/DataContainer';
import { TableContextProvider } from '../../Context/TableContext';

export default function Crud() {
  return (
    <TableContextProvider>
      <div className={Styles.flexContainer}>
        <aside className={`${Styles.menu}`}>
          <Menu />
        </aside>
        <main className={` ${Styles.main}  `}>
          <DataContainer />
        </main>
      </div>
    </TableContextProvider>
  );
}
