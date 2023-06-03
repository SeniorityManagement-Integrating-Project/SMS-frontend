import React, { ReactNode } from 'react';
import { Menu, MenuItem, useMediaQuery } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';

interface Props {
  items: ReactNode[];
}

export const Navbar = ({ items }: Props) => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      className='sticky top-0 z-40 w-full backdrop-blur flex justify-between items-center bg-background-3/40 border-b
      border-slate-300/20 text-white p-4 min-h-[3rem]'
    >
      {isSmallScreen ? (
        <div>
          <button type='button' id='basic-button' onClick={handleClick}>
            <TbDotsVertical size={25} />
          </button>
          <Menu
            sx={{ '& .MuiPaper-root': { backgroundColor: '#4a4a4a', color: 'white' } }}
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {items.map((item) => (
              // @ts-ignore-next-line
              <MenuItem className='font-bold' key={item.key}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <ul className='flex items-center grow justify-evenly gap-3 font-bold'>
          {items.map((item) => (
            // @ts-ignore-next-line
            <li key={item.key}>{item}</li>
          ))}
        </ul>
      )}
    </nav>
  );
};
