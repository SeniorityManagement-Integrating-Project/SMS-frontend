import { Modal as MuiModal } from '@mui/material';
import { ModalProps } from '@mui/material/Modal';

export const Modal = ({ children, className, ...props }: ModalProps) => (
  <MuiModal {...props}>
    <div
      className={`absolute p-8 -translate-x-1/2 -translate-y-1/2 rounded-md top-1/2 left-1/2 min-w-[375px] bg-background-1 ${className}`}
    >
      {children}
    </div>
  </MuiModal>
);
