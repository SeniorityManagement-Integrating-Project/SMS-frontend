import { Modal as MuiModal } from '@mui/material';

export const Modal = ({ children, className, ...props }: any) => (
  <MuiModal {...props}>
    <div
      className={`absolute p-8 -translate-x-1/2 -translate-y-1/2 rounded-md top-1/2 left-1/2 min-w-[375px] bg-background-1 ${className}`}
    >
      {children}
    </div>
  </MuiModal>
);
