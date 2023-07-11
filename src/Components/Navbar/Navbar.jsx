import { Divider, Button } from '@mui/material';

export default function Navbar({ setActualPage }) {
  function handleClick(e) {
    setActualPage(e.target.value);
  }

  return (
    <div className='navbar'>
      <Button
        className='navbarBtn'
        onClick={handleClick}
        variant='text'
        value='Crud'
      >
        Crud
      </Button>
      <Divider orientation='vertical' flexItem />
      <Button
        className='navbarBtn'
        onClick={handleClick}
        variant='text'
        value='Query'
      >
        Query
      </Button>
      <Divider orientation='vertical' flexItem />
      <Button
        className='navbarBtn'
        onClick={handleClick}
        variant='text'
        value='Logs'
      >
        Logs
      </Button>
    </div>
  );
}
