import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { swal2Config } from '@/config/swal2Config';
import { FiUploadCloud } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  employeeId: number;
  skillId: number;
  onSubmit: () => void;
}

export const NewSkillRequest = ({ employeeId, skillId, onSubmit }: Props) => {
  const [file, setFile] = useState<File | undefined>();

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
        ...swal2Config,
        title: 'Request Created!',
        text: `The request has been created successfully.`,
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    } else if (response.status === 409) {
      await Swal.fire({
        ...swal2Config,
        title: 'Oops!',
        text: `${data.message}`,
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    } else {
      await Swal.fire({
        ...swal2Config,
        title: 'Oops! Something went wrong',
        text: `${data.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    onSubmit();
    e.preventDefault();
    createRequest();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files?.[0]);
  };

  return (
    <article>
      <h2 className='mb-4 text-xl font-bold text-center'>Add an attachment to your request</h2>
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
          className='px-5 py-2 mt-4 text-lg text-white rounded-lg bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!file}
        >
          Send the Request
        </button>
      </form>
    </article>
  );
};
