import MenuSelect from '../MenuSelect/MenuSelect';
import MenuInputs from '../MenuInputs/MenuInputs';
import { InputSelectContextProvider } from '../../Context/inputSelectContext';
import { Button } from '@mui/material';

export default function Menu() {
  return (
    <>
      <MenuSelect />
      <div>
        <Button variant='text'>Select</Button>
        <Button variant='text'>Save</Button>
        <Button variant='text'>Delete</Button>
      </div>
      <InputSelectContextProvider>
        <MenuInputs />
      </InputSelectContextProvider>
    </>
  );
}
