import { formatDate } from '@/utils/date';
import { RequestStatusBadge } from '@/components/RequestStatusBadge';
import { TbFile, TbPdf } from 'react-icons/tb';
import { Tooltip } from '@mui/material';
import { RequestCommentList } from '@components/RequestCommentList';

interface Props {
  requestedAt: string;
  validatedAt: string;
  approved: boolean;
  validated: boolean;
  skillName: string;
  skillDescription: string;
  supportFile?: string;
  validator?: {
    username: string;
  };
  comments: any[];
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
  validator,
}: Props) => (
  <div className='p-6 m-6 rounded-lg bg-background-2 flex justify-between'>
    <div className='flex flex-col justify-center gap-2 text-sm'>
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
        {validated && validator && (
          <p>
            <span className='font-bold'>validator:</span> {validator?.username}
          </p>
        )}
      </div>
      <div>
        {comments.length > 0 && (
          <>
            <h3 className='text-sm font-bold'>Comments:</h3>
            <RequestCommentList comments={comments} />
          </>
        )}
      </div>
    </div>
    <div className='flex flex-col items-center justify-between gap-8'>
      <RequestStatusBadge approved={approved} validated={validated} />
      <Tooltip title={supportFile} arrow>
        <div className='text-3xl text-gray-300'>
          <TbFile />
          <TbPdf />
        </div>
      </Tooltip>
    </div>
  </div>
);
