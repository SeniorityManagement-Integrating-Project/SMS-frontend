import { formatDate, timeAgo } from '@/utils/date';
import { RequestStatusBadge } from '@/components/RequestStatusBadge';
import { TbFile, TbPdf } from 'react-icons/tb';

interface Props {
  requestedAt: string;
  validatedAt: string;
  approved: boolean;
  validated: boolean;
  skillName: string;
  skillDescription: string;
  supportFile?: string;
  comments: {
    comment: string;
    date: string;
  }[];
}

export const SkillRequestCard = ({
  requestedAt,
  validatedAt,
  approved,
  validated,
  skillName,
  skillDescription,
  comments,
  supportFile,
}: Props) => (
  <div className='shadow-[0px_0px_15px_0px] rounded-lg m-6 p-4 shadow-gray-200 bg-gray-100 border-gray-200 border flex justify-between'>
    <div className='flex flex-col justify-center gap-2 text-xs text-gray-600'>
      <div>
        <h2 className='text-xl font-bold'>{skillName}</h2>
        <p>{skillDescription}</p>
      </div>
      <div>
        <p>
          <span className='font-bold'> request date:</span> {formatDate(requestedAt)}
        </p>
        {validated && (
          <p>
            <span className='font-bold'>validation date:</span> {formatDate(validatedAt)}
          </p>
        )}
      </div>
      <div>
        {comments.length > 0 && (
          <>
            <h3 className='text-base font-bold'>Comments:</h3>
            <div className='flex flex-col gap-1'>
              {comments.map((comment) => (
                <div key={comment.date} className='px-4 py-1 text-sm'>
                  <p>{comment.comment}</p>
                  <p className='text-xs text-gray-400'>{timeAgo(comment.date)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    <div className='flex flex-col items-center justify-between gap-8'>
      <RequestStatusBadge approved={approved} validated={validated} />
      <a href={supportFile || '#'} className='text-3xl text-gray-600'>
        <TbFile />
        <TbPdf />
      </a>
    </div>
  </div>
);
