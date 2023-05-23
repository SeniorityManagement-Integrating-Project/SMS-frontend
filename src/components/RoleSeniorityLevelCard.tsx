import { useState } from 'react';
import { TbChevronDown, TbCirclePlus } from 'react-icons/tb';
import { Chip } from '@mui/material';
import { Modal } from '@/components/Modal';
import { CgCloseO } from 'react-icons/cg';
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
    <div>
      <button type='button' className='w-full text-left' onClick={() => setShowDetails(!showDetails)}>
        <h4 className='text-xl font-medium'>
          {name} Level <TbChevronDown className={`inline text-primary transition-all ${showDetails && 'rotate-180'}`} />
        </h4>
      </button>
      {showDetails && (
        <div className='text-sm text-gray-200'>
          <p>descripción: {description}</p>
          <div className='flex flex-wrap items-center gap-1 text-white'>
            skills:{' '}
            {skills.map((skill: any) => (
              <Chip
                key={skill.id}
                label={skill.name}
                deleteIcon={<CgCloseO className='' />}
                size='small'
                variant='outlined'
                onDelete={() => {
                  removeSkill(id, skill.id);
                }}
                sx={{
                  backgroundColor: '#4a4a4a',
                  borderColor: '#FF2965',
                  color: 'white',
                  '&	.MuiChip-deleteIcon': {
                    color: 'white',
                  },
                }}
              />
            ))}
            <Chip
              icon={<TbCirclePlus className='text-red-500' />}
              label='Add skill'
              size='small'
              onClick={() => {
                setModalOpen(true);
              }}
              sx={{
                backgroundColor: '#4a4a4a',
                color: 'white',
                '&	.MuiChip-icon': {
                  color: 'white',
                },
              }}
            />
          </div>
        </div>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AddSkillToSeniorityLevel addSkill={handleAddSkill} availableSkills={availableSkills} />
      </Modal>
    </div>
  );
};
