import { ProfileMainCard } from '@components/ProfileMainCard';
import { ProfileSkillsCard } from '@components/ProfileSkillsCard';
import { ProfileDashboardCard } from '@components/ProfileDashboardCard';
import { useFetch } from '@hooks/useFetch';
import { Loader } from '@components/Loader';
import React, { useEffect, useState } from 'react';

// TODO: Add a button to edit the profile
//  Add a button to Go to GrowthPath (maybe 'Recent Skills' title)
//  Convert to Dark Style
//  Add Stars/Interaction button/counter (if possible)

const TestingPage = () => {
  const { data, loading, error } = useFetch<any>(`${process.env.NEXT_PUBLIC_API_URL}/employee/role/2`);
  const [skills, setSkills] = useState([]);
  const getSkills = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/skills/2`);
    const employeeSkills = await response.json();
    setSkills(employeeSkills.skills);
  };
  useEffect(() => {
    getSkills();
  }, []);
  let content;
  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <p className='py-5 text-center'>Something went wrong, try again</p>;
  } else {
    content = (
      <>
        <div className='w-full h-20 border-b-2 border-b-gray-500'>Holi</div>
        <div className='flex w-full'>
          <aside className='w-[40%] px-24 py-16'>
            <ProfileMainCard name={data.name} email={data.email} role={data.role?.name} />
          </aside>
          <div className='flex flex-col w-[60%] py-16 pr-24'>
            <ProfileSkillsCard skills={skills} />
            <ProfileDashboardCard />
          </div>
        </div>
      </>
    );
  }
  return <div className='flex flex-col w-full h-screen'>{content}</div>;
};

export default TestingPage;
