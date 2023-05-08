import { useFetch } from '@/hooks/useFetch';
import { AddSeniorityLevelForm } from '@/components/AddSeniorityLevelForm';
import { Modal } from '@mui/material';
import { useState } from 'react';

interface Props {
  id: string;
  name: string;
  description: string;
  allSeniorityLevels: any[];
}
export const RoleCard = ({ id, name, description, allSeniorityLevels }: Props) => {
  const [open, setOpen] = useState(false);

  const { data: seniorityLevels, reload } = useFetch<any[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/seniority_level/role/${id}`
  );
  let missingSeniorityLevels = [];
  if (seniorityLevels) {
    missingSeniorityLevels = allSeniorityLevels.filter((sl) => !seniorityLevels.some((i) => i.id === sl.id));
  }
  return (
    <div className='relative p-4 bg-white border-2 rounded-md shadow-md border-b-rose-600'>
      <div className='pb-2 mb-4 border-b border-gray-600'>
        <h3 className='text-lg font-medium text-gray-900'>{name}</h3>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>

      <div>
        {seniorityLevels !== null && (
          <>
            <div className='flex flex-col gap-2 mb-3'>
              {seniorityLevels.map((seniorityLevel) => (
                <div className='' key={seniorityLevel.id}>
                  <h1>
                    {seniorityLevel.level} {seniorityLevel.name}
                  </h1>
                  <p className='text-sm text-gray-500'>{seniorityLevel.description}</p>
                </div>
              ))}
            </div>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='flex items-center gap-2 px-4 text-white rounded-full bg-rose-600'
            >
              Add seniority level
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <div className='absolute text-base p-8 bg-white rounded-md -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[32em]'>
                <AddSeniorityLevelForm
                  roleId={id}
                  seniorityLevels={missingSeniorityLevels}
                  onSubmit={() => {
                    setOpen(false);
                  }}
                  onSubmitSuccess={() => {
                    reload();
                  }}
                />
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
