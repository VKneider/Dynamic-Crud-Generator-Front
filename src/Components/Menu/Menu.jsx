import MenuSelect from '../MenuSelect/MenuSelect';
import MenuInputs from '../MenuInputs/MenuInputs';
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
      <MenuInputs />
    </>
  );
}
