import { useState } from 'react';
import { TbChevronDown, TbCirclePlus } from 'react-icons/tb';
import { Chip, Modal } from '@mui/material';
import { AddSkillToSeniorityLevel } from '@components/AddSkillToSeniorityLevel';

interface Props {
  id: number;
  name: string;
  description: string;
  availableSkills: any[];
  skills: {
    id: number;
    name: string;
    description: string;
  }[];
  addSkill: (roleSeniorityLevelId: number, skillId: number) => void;
  removeSkill: (roleSeniorityLevelId: number, skillId: number) => void;
}

export const RoleSeniorityLevelCard = ({
  id,
  name,
  description,
  skills,
  availableSkills,
  addSkill,
  removeSkill,
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleAddSkill = (skillId: number) => {
    addSkill(id, skillId);
    setModalOpen(false);
  };
  return (
    <>
      <button type='button' className='text-left w-full' onClick={() => setShowDetails(!showDetails)}>
        <h4 className='text-xl py-4'>
          {name} Level{' '}
          <TbChevronDown className={`inline text-rose-500 transition-all ${showDetails && 'rotate-180'}`} />
        </h4>
      </button>
      {showDetails && (
        <div className='text-sm text-gray-500 mb-6'>
          <p>descripción: {description}</p>
          <div className='flex flex-wrap items-center gap-1'>
            skills:{' '}
            {skills.map((skill: any) => (
              <Chip
                key={skill.id}
                label={skill.name}
                size='small'
                variant='outlined'
                onDelete={() => {
                  removeSkill(id, skill.id);
                }}
                sx={{ borderColor: 'rgb(244 63 94)' }}
              />
            ))}
            <Chip
              icon={<TbCirclePlus />}
              label='Add skill'
              size='small'
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </div>
        </div>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className='absolute p-8 bg-white rounded-md -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <AddSkillToSeniorityLevel addSkill={handleAddSkill} availableSkills={availableSkills} />
        </div>
      </Modal>
    </>
  );
};
