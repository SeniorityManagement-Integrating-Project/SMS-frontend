import { useFetch } from '@/hooks/useFetch';
import { AddSeniorityLevelForm } from '@/components/AddSeniorityLevelForm';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { RoleSeniorityLevelCard } from '@components/RoleSeniorityLevelCard';

interface Props {
  id: string;
  name: string;
  description: string;
  allSeniorityLevels: any[];
}

export const RoleCard = ({ id, name, description, allSeniorityLevels }: Props) => {
  const [open, setOpen] = useState(false);

  const { data, reload } = useFetch<any[]>(`${process.env.NEXT_PUBLIC_API_URL}/role_seniority_level/role/${id}`);
  let missingSeniorityLevels = [];
  if (data) {
    missingSeniorityLevels = allSeniorityLevels.filter((sl) => !data.some((i) => i.seniority_level.id === sl.id));
  }
  return (
    <>
      <div className='mb-2'>
        <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Role: {name}</h1>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>
      <h3 className='text-base mb-3'>Seniority levels:</h3>
      <div className='ml-4 font-light'>
        {data !== null && (
          <>
            <div className='mb-3'>
              {data.map((roleSeniorityLevel) => (
                <RoleSeniorityLevelCard
                  {...roleSeniorityLevel.seniority_level}
                  skills={roleSeniorityLevel.skills}
                  key={roleSeniorityLevel.seniority_level.id}
                />
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
    </>
  );
};
