interface Props {
  skills: Array<any>;
}

const ProfileSkillsCard = ({ skills }: Props) => {
  const lastNineItems = skills.slice(-9).reverse();
  return (
    <div className='max-h-72 rounded-2xl border-2 border-rose-600 p-5 mb-16'>
      <div id='p-skills-container' className='flex flex-col gap-3'>
        <b>
          <h3 className='text-left text-rose-600 text-xl'>RECENT SKILLS</h3>
        </b>
        <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
          {lastNineItems.map((skill) => (
            <div key={skill.id} className='p-4'>
              <ul className='list-disc pl-2'>
                <li>{skill.name}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProfileSkillsCard };
