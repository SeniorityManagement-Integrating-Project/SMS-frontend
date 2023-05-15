import { Chip } from '@mui/material';
import { useState } from 'react';

interface Props {
  addSkill: (skillId: number) => void;
  availableSkills: any[];
}

export const AddSkillToSeniorityLevel = ({ addSkill, availableSkills }: Props) => {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  return (
    <>
      <div className='flex flex-wrap gap-1 mb-3'>
        {availableSkills.length === 0
          ? 'No skills to add'
          : availableSkills?.map((skill: any) => (
              <Chip
                key={skill.id}
                label={skill.name}
                size='small'
                variant='outlined'
                onClick={() => setSelectedSkill(skill.id)}
                sx={selectedSkill === skill.id ? { borderColor: 'rgb(244 63 94)' } : {}}
              />
            ))}
      </div>
      <button
        type='button'
        disabled={selectedSkill === null}
        className='flex items-center gap-2 px-4 text-white rounded-full bg-rose-600 mx-auto'
        onClick={() => {
          if (selectedSkill) {
            addSkill(selectedSkill);
          }
        }}
      >
        Add skill
      </button>
    </>
  );
};
