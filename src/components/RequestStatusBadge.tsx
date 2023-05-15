import { TbCircleCheck, TbCircleDashed, TbForbid2 } from 'react-icons/tb';

interface Props {
  approved: boolean;
  validated: boolean;
}

enum Status {
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  PENDING = 'Pending',
}

const getRequestStatus = (approved: boolean, validated: boolean): string => {
  if (approved) {
    return Status.APPROVED;
  }
  if (validated) {
    return Status.REJECTED;
  }
  return Status.PENDING;
};

const getRequestStatusColor = (status: string) => {
  if (status === Status.APPROVED) {
    return 'border-green-500 text-green-500';
  }
  if (status === Status.REJECTED) {
    return 'border-red-500 text-red-500';
  }
  return 'border-gray-500  text-gray-500';
};

const getRequestStatusIcon = (status: string) => {
  if (status === Status.APPROVED) {
    return <TbCircleCheck className='text-3xl text-green-500' />;
  }
  if (status === Status.REJECTED) {
    return <TbForbid2 className='text-3xl text-red-500' />;
  }
  return <TbCircleDashed className='text-3xl text-gray-500' />;
};

export const RequestStatusBadge = ({ approved, validated }: Props) => {
  const requestStatus: string = getRequestStatus(approved, validated);
  return (
    <span className={`flex items-center gap-1 rounded-full px-1 ${getRequestStatusColor(requestStatus)} `}>
      {getRequestStatusIcon(requestStatus)}
      {requestStatus}
    </span>
  );
};
