import { Modal } from '@/components/Modal';
import React, { useState } from 'react';
import { TbCircle, TbCircleCheck, TbForbid2 } from 'react-icons/tb';
import { SkillDetails } from '@/components/SkillDetails';
import { NewSkillRequest } from '@/components/NewSkillRequest';
import { useRouter } from 'next/router';

interface Props {
  name: string;
  description: string;
  level: number;
  completed: boolean;
  skills: any[];
}

enum ModalContent {
  NEW_REQUEST = 'NEW_REQUEST',
  SKILL_REQUESTS = 'SKILL_REQUESTS',
}

export const SeniorityLevelEmployeeCard = ({ name, description, level, completed, skills }: Props) => {
  const router = useRouter();

  const { employeeId } = router.query;
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [modalContent, setModalContent] = useState<ModalContent>(ModalContent.SKILL_REQUESTS);
  const handleClose = () => {
    setModalOpen(false);
    setModalContent(ModalContent.SKILL_REQUESTS);
  };

  return (
    <div className={`p-6 m-6 rounded-lg bg-background-2 ${completed && 'border border-gray-500'}`}>
      <h2 className='text-xl font-bold'>
        {level}. {name}
      </h2>
      <p className='text-xs text-gray-300'>{description}</p>
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
              <button
                type='button'
                onClick={() => {
                  setSelectedSkill(skill.id);
                  setModalOpen(true);
                }}
              >
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
      <Modal open={modalOpen} onClose={handleClose}>
        {modalContent === ModalContent.SKILL_REQUESTS ? (
          <>
            <SkillDetails employeeId={Number(employeeId)} skillId={selectedSkill} />
            {selectedSkill && !skills.find((s) => s.id === selectedSkill).is_attained && (
              <div className='flex justify-center mt-5'>
                <button
                  type='button'
                  className='underline text-rose-500'
                  onClick={() => setModalContent(ModalContent.NEW_REQUEST)}
                >
                  Request validation for this skill
                </button>
              </div>
            )}
          </>
        ) : (
          <NewSkillRequest employeeId={Number(employeeId)} skillId={selectedSkill} onSubmit={handleClose} />
        )}
      </Modal>
    </div>
  );
};
