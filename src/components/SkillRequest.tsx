import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FiUploadCloud } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  employeeId: number;
  skillId: number;
  handleCloseReqModal: () => void;
}

const SkillRequest = ({ employeeId, skillId, handleCloseReqModal }: Props) => {
  const [file, setFile] = useState<File | undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    handleCloseReqModal();
    e.preventDefault();
    /* TODO: Search how to upload a file to AWS S3 and get the URL
     *  To send that URL in the request to the backend
     *  https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
     * */

    const createRequest = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/request/${employeeId}/${skillId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          support_file: file?.name,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        await Swal.fire({
          title: 'Request Created!',
          text: `The request has been created successfully.`,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      } else {
        await Swal.fire({
          title: 'Oops! Something went wrong',
          text: `${data.message}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    };
    createRequest();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files?.[0]);
  };

  return (
    <article>
      <h2 className='text-xl font-bold mb-4 text-center'>Add an attachment to your request</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <div className='max-w-md'>
          <label htmlFor='file-input' className='flex flex-col items-center overflow-hidden cursor-pointer'>
            <FiUploadCloud className='text-gray-600 text-9xl' />
            <span id='fileName' className='underline text-rose-500'>
              {file?.name || 'Choose a file'}
            </span>
            <input id='file-input' type='file' onChange={handleFileUpload} accept='.pdf' className='hidden' />
          </label>
        </div>
        <button
          type='submit'
          className='mt-4 px-5 py-2 text-lg text-white rounded-lg bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!file}
        >
          Send the Request
        </button>
      </form>
    </article>
  );
};

export { SkillRequest };
