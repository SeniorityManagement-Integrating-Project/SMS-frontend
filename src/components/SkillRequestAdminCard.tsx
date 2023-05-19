import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { TbSend } from 'react-icons/tb';
import { formatDate } from '@/utils/date';
import * as process from 'process';
import { useInput } from '@hooks/useInput';
import { FormEvent } from 'react';
import { RequestCommentList } from '@components/RequestCommentList';
import { swal2Config } from '@/config/swal2Config';

interface Props {
  requestID: number;
  requestedAt: string;
  employee: any;
  skill: any;
  comments: any[];
  supportFile?: string;
  reload: () => void;
}

const SkillRequestAdminCard = ({ requestID, requestedAt, employee, skill, comments, supportFile, reload }: Props) => {
  const comment = useInput({ type: 'text', initialValue: '', name: 'comment', placeholder: 'write a new comment' });
  const Approved = async (approved: boolean) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/request/${requestID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TODO: Add validator ID here instead of null in a future
        validator: null,
        approved,
      }),
    });
    return { response, data: await response.json() };
  };

  const validate = () => {
    Swal.fire({
      ...swal2Config,
      title: 'The request will be?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#22C55E',
      confirmButtonText: '<b>Approved</b>',
      denyButtonText: `<b>Denied</b>`,
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          const { response, data } = await Approved(true);
          if (response.status === 200) {
            Swal.fire({
              ...swal2Config,
              title: 'Request Approved!',
              icon: 'success',
              didDestroy() {
                reload();
              },
            });
          } else {
            Swal.fire({ ...swal2Config, title: 'Oops! Something went wrong', text: `${data.message}`, icon: 'error' });
          }
        })();
      } else if (result.isDenied) {
        (async () => {
          const { response, data } = await Approved(false);
          if (response.status === 200) {
            Swal.fire({
              ...swal2Config,
              title: 'Request Denied!',
              icon: 'success',
              didDestroy() {
                reload();
              },
            });
          } else {
            Swal.fire({ ...swal2Config, title: 'Oops! Something went wrong', text: `${data.message}`, icon: 'error' });
          }
        })();
      }
    });
  };

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${requestID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: requestID,
        comment: comment.value,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      comment.setValue('');
      reload();
    } else {
      Swal.fire({ ...swal2Config, title: 'Oops! Something went wrong', text: `${data.message}`, icon: 'error' });
    }
  };

  return (
    <div className='shadow-[0px_0px_15px_0px] rounded-lg m-6 p-4 shadow-gray-200 bg-gray-100 border-gray-200 border w-96 flex flex-col overflow-hidden'>
      <p>
        <span className='font-bold'>Date:</span> {formatDate(requestedAt)}
      </p>
      <p>
        <span className='font-bold'>Employee:</span> {employee.name}
      </p>
      <p>
        <span className='font-bold'>Skill:</span> {skill.name}
      </p>
      <p className='whitespace-nowrap'>
        <span className='font-bold'>Support File: </span>
        <span className='underline text-rose-500'>{supportFile}</span>
      </p>
      <p className='font-bold'>Comments:</p>
      <RequestCommentList comments={comments} />
      <form className='flex items-center gap-3 mt-auto' onSubmit={submitComment}>
        <input
          className='bg-background-3 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5 focus:border-b-primary focus:outline-primary'
          {...comment}
        />
        <button type='submit'>
          <TbSend size={25} />
        </button>
      </form>
      <button
        type='button'
        className='px-5 py-2 mt-3 text-lg font-bold text-white rounded-lg bg-rose-500 hover:bg-rose-600'
        onClick={validate}
      >
        Validate
      </button>
    </div>
  );
};

export { SkillRequestAdminCard };
