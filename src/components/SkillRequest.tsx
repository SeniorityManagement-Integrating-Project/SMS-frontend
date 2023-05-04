import { FiUploadCloud } from 'react-icons/fi';

interface Props {
  handleCloseReqModal: () => void;
}

const SkillRequest = ({ handleCloseReqModal }: Props) => {
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('fileName')!.innerHTML = file.name;
    } else {
      document.getElementById('fileName')!.innerHTML = 'Choose File';
    }
  };

  return (
    <article>
      <h2 className='text-xl font-bold mb-4 text-center'>Add an attachment to your request</h2>
      <div className='flex flex-col items-center'>
        <div className='max-w-md'>
          <label htmlFor='file-input' className='flex flex-col items-center overflow-hidden'>
            <FiUploadCloud className='text-gray-600 text-9xl' />
            <span id='fileName' className='underline text-rose-500'>
              Choose File
            </span>
            <input id='file-input' type='file' onChange={handleFileUpload} accept='.pdf' className='hidden' />
          </label>
        </div>
        <button
          type='button'
          className='mt-4 px-5 py-2 text-lg text-white rounded-lg bg-rose-600'
          onClick={handleCloseReqModal}
        >
          Send the Request
        </button>
      </div>
    </article>
  );
};

export { SkillRequest };
