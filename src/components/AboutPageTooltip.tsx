import { TbQuestionMark, TbX } from 'react-icons/tb';
import { Fab, Tooltip } from '@mui/material';
import { ReactNode, useState } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export const AboutPageTooltip = ({ className, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      title={children}
      disableFocusListener
      disableTouchListener
      disableHoverListener
      arrow
      placement='top'
      onClose={() => setOpen(false)}
      open={open}
    >
      <Fab
        className={`text-white fixed bottom-0 hover:bg-primary right-0 m-5 
        ${open ? 'bg-primary' : 'bg-black'} ${className}`}
        size='small'
        aria-label='about'
        onClick={() => setOpen(!open)}
      >
        {open ? <TbX /> : <TbQuestionMark />}
      </Fab>
    </Tooltip>
  );
};
