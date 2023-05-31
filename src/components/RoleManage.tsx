import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { swal2Config } from '@/config/swal2Config';
import { useFetch } from '@/hooks/useFetch';
import { AddSeniorityLevelForm } from '@/components/AddSeniorityLevelForm';
import { Modal } from '@/components/Modal';
import { useState } from 'react';
import { RoleSeniorityLevelCard } from '@components/RoleSeniorityLevelCard';
import { Button } from '@/components/Button';

interface Props {
  id: string;
  name: string;
  description: string;
  allSeniorityLevels: any[];
}

export const RoleManage = ({ id, name, description, allSeniorityLevels }: Props) => {
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

  const swalError = async () => {
    await Swal.fire({
      ...swal2Config,
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong, try again later',
    });
  };
  const addSkill = (roleSeniorityLevelId: number, skillId: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/role_seniority_level/${roleSeniorityLevelId}/${skillId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch(() => swalError())
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
      .catch(() => swalError())
      .then(() => {
        availableSkillsReload();
        seniorityLevelsReload();
      });
  };
  return (
    <>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Role: {name}</h1>
      <p className='text-sm text-gray-100'>{description}</p>
      <div className='font-light'>
        {seniorityLevelsData !== null && (
          <>
            <div className='flex justify-center mt-8'>
              <Button type='button' onClick={() => setOpen(true)} className='mx-auto '>
                Add seniority level
              </Button>
            </div>
            <div className='mb-3'>
              {seniorityLevelsData.map((roleSeniorityLevel) => (
                <div className='p-6 my-6 rounded-lg bg-background-2' key={roleSeniorityLevel.id}>
                  <RoleSeniorityLevelCard
                    id={roleSeniorityLevel.id}
                    name={roleSeniorityLevel.seniority_level.name}
                    description={roleSeniorityLevel.description}
                    skills={roleSeniorityLevel.skills}
                    addSkill={addSkill}
                    removeSkill={removeSkill}
                    availableSkills={availableSkillsData || []}
                  />
                </div>
              ))}
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
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
            </Modal>
          </>
        )}
      </div>
    </>
  );
};
