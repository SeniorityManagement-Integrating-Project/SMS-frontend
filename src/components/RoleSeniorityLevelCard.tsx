import { useState } from 'react';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';

interface Props {
  name: string;
  level: number;
  description: string;
  skills: {
    id: number;
    name: string;
    description: string;
  }[];
}

export const RoleSeniorityLevelCard = ({ name, level, description, skills }: Props) => {
  const [showSkills, setShowSkills] = useState(true);

  return (
    <div>
      <h4 className='font-normal'>
        {level} {name}
      </h4>
      <p className='text-sm text-gray-500'>{description}</p>
      {showSkills &&
        (skills.length > 0 ? (
          <ul className='list-decimal list-inside text-sm ml-4'>
            {skills.map((skill: any) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        ) : (
          <p className='text-sm'>No skills for this level yet</p>
        ))}
      <button
        type='button'
        className='text-sm text-left text-gray-500'
        onClick={() => {
          setShowSkills(!showSkills);
        }}
      >
        {showSkills ? (
          <>
            Hide skills
            <TbChevronUp className='inline' />
          </>
        ) : (
          <>
            Show skills <TbChevronDown className='inline' />
          </>
        )}
      </button>
    </div>
  );
};
