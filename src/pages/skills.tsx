import { useEffect, useState } from 'react';
import { SkillCard } from '@components/SkillCard';
import { SkillForm } from '@components/SkillForm';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const getSkills = async () => {
    const response = await fetch('http://ec2-35-171-27-114.compute-1.amazonaws.com:9000/skill/');
    const data = await response.json();
    setSkills(data);
  };
  const reloadSkills = () => {
    getSkills();
  };
  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div>
      <h1>Skills:</h1>
      <div className='flex flex-wrap justify-center gap-2 mb-4'>
        {skills.map((skill: { id: number; name: string; description: string }) => (
          <SkillCard
            key={skill.id}
            id={skill.id}
            title={skill.name}
            description={skill.description}
            reloadSkills={reloadSkills}
          />
        ))}
      </div>
      <SkillForm onSubmit={reloadSkills} />
    </div>
  );
};
export default Skills;
