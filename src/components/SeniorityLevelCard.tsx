import { Modal } from '@mui/material';
import React from 'react';
import { TbCircle, TbCircleCheck, TbForbid2 } from 'react-icons/tb';
import { SkillDetails } from '@/components/SkillDetails';
import { SkillRequest } from '@/components/SkillRequest';
import { useRouter } from 'next/router';

interface Props {
  name: string;
  description: string;
  level: number;
  completed: boolean;
  skills: any[];
}

export const SeniorityLevelCard = ({ name, description, level, completed, skills }: Props) => {
  const router = useRouter();
  const { employeeId } = router.query;
  // Skill Details Modal
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  // Skill Request Modal
  const [modalRequestOpen, setModalRequestOpen] = React.useState(false);
  const handleOpen2 = () => setModalRequestOpen(true);
  const handleClose2 = () => setModalRequestOpen(false);
  const [selectedSkill, setSelectedSkill] = React.useState<any>(null); // [skill, setSkill

  const handleSkillClick = (skillId: number) => {
    setSelectedSkill(skillId);
    handleOpen();
  };
  return (
    <div
      className={`shadow-[0px_0px_15px_0px] rounded-lg m-6 p-4 ${
        completed ? 'shadow-rose-200 bg-rose-50 border-rose-200' : 'shadow-gray-200 bg-gray-100 border-gray-200'
      } border `}
    >
      <Modal open={modalOpen} onClose={handleClose}>
        <div className='absolute p-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md top-1/2 left-1/2 sm:min-w-[400px]'>
          <SkillDetails
            employeeId={Number(employeeId)}
            skillId={selectedSkill}
            handleCloseModal={handleClose}
            handleOpenReqModal={handleOpen2}
          />
        </div>
      </Modal>
      <Modal open={modalRequestOpen} onClose={handleClose2}>
        <div className='absolute p-8 bg-white rounded-md -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[32em]'>
          <SkillRequest handleCloseReqModal={handleClose2} />
        </div>
      </Modal>
      <h1 className='text-xl font-bold'>
        {level} {name}
      </h1>
      <p className='text-xs text-gray-600'>{description}</p>
      <h2 className='font-bold'>Skills</h2>
      {skills.length > 0 ? (
        <ul className='ml-2 list-disc list-inside'>
          {skills.map((skill) => (
            <li key={skill.id} className='flex items-center gap-3'>
              {skill.is_attained ? (
                <TbCircleCheck className='text-xl text-green-600' />
              ) : (
                <TbCircle className='text-xl text-gray-600' />
              )}{' '}
              <button type='button' onClick={() => handleSkillClick(skill.id)}>
                {skill.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='flex items-center gap-3 ml-2'>
          <TbForbid2 className='text-xl text-red-600' /> No skills for this level yet
        </p>
      )}
    </div>
  );
};
