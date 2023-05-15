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

  const { data: seniorityLevelsData, reload: seniorityLevelsReload } = useFetch<any[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/role_seniority_level/role/${id}`
  );
  const { data: availableSkillsData, reload: availableSkillsReload } = useFetch<any[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/role/available_skills/${id}`
  );
  let missingSeniorityLevels = [];
  if (seniorityLevelsData) {
    missingSeniorityLevels = allSeniorityLevels.filter(
      (sl) => !seniorityLevelsData.some((i) => i.seniority_level.id === sl.id)
    );
  }
  const addSkill = (roleSeniorityLevelId: number, skillId: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/role_seniority_level/${roleSeniorityLevelId}/${skillId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        availableSkillsReload();
        seniorityLevelsReload();
      });
  };
  const removeSkill = (roleSeniorityLevelId: number, skillId: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/role_seniority_level/${roleSeniorityLevelId}/${skillId}`, {
      method: 'DELETE',
      headers: {},
    })
      .then((response) => response.json())
      .then(() => {
        availableSkillsReload();
        seniorityLevelsReload();
      });
  };
  return (
    <>
      <div className='mb-2'>
        <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Role: {name}</h1>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>
      <div className='font-light'>
        {seniorityLevelsData !== null && (
          <>
            <div className='mb-3'>
              <hr />
              {seniorityLevelsData.map((roleSeniorityLevel) => (
                <div key={roleSeniorityLevel.id}>
                  <RoleSeniorityLevelCard
                    id={roleSeniorityLevel.id}
                    name={roleSeniorityLevel.seniority_level.name}
                    description={roleSeniorityLevel.description}
                    skills={roleSeniorityLevel.skills}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                    availableSkills={availableSkillsData || []}
                  />
                  <hr />
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
                    seniorityLevelsReload();
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
