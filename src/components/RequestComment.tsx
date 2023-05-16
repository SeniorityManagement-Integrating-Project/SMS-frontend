import { timeAgo } from '@/utils/date';

interface Props {
  comment: string;
  date: string;
}

export const RequestComment = ({ comment, date }: Props) => (
  <div className='py-1'>
    <p>{comment}</p>
    <p className='text-gray-400 text-xs'>{timeAgo(date)}</p>
  </div>
);
