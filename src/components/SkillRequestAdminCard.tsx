import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { formatDate } from '@/utils/date';
import * as process from 'process';

interface Props {
  requestID: number;
  requestedAt: string;
  employeeID: number;
  skillID: number;
  supportFile?: string;
  reload: () => void;
}

const SkillRequestAdminCard = ({ requestID, requestedAt, employeeID, skillID, supportFile, reload }: Props) => {
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
      title: 'The request will be?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '<b>Approved</b>',
      denyButtonText: `<b>Denied</b>`,
      confirmButtonColor: '#22c55e',
      denyButtonColor: '#e11d48',
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          const { response, data } = await Approved(true);
          if (response.status === 200) {
            Swal.fire({
              title: 'Request Approved!',
              icon: 'success',
              didDestroy() {
                reload();
              },
            });
          } else {
            Swal.fire('Oops! Something went wrong', `${data.message}`, 'error');
          }
        })();
      } else if (result.isDenied) {
        (async () => {
          const { response, data } = await Approved(false);
          if (response.status === 200) {
            Swal.fire({
              title: 'Request Denied!',
              icon: 'success',
              didDestroy() {
                reload();
              },
            });
          } else {
            Swal.fire('Oops! Something went wrong', `${data.message}`, 'error');
          }
        })();
      }
    });
  };

  return (
    <div className='shadow-[0px_0px_15px_0px] rounded-lg m-6 p-4 shadow-gray-200 bg-gray-100 border-gray-200 border w-64 h-60 flex flex-col overflow-hidden'>
      <p>
        <span className='font-bold'>Date:</span> {formatDate(requestedAt)}
      </p>
      <p>
        <span className='font-bold'>Employee ID:</span> {employeeID}
      </p>
      <p>
        <span className='font-bold'>Skill ID:</span> {skillID}
      </p>
      <p className='whitespace-nowrap'>
        <span className='font-bold'>Support File: </span>
        <span className='underline text-rose-500'>{supportFile}</span>
      </p>
      <button
        type='button'
        className='px-5 py-2 mt-auto text-lg text-white font-bold rounded-lg bg-gradient-to-b from-[#FF2965] to-[#E81CFF]'
        onClick={validate}
      >
        Validate
      </button>
    </div>
  );
};

export { SkillRequestAdminCard };
