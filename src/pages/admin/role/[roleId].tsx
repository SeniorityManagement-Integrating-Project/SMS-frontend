import React from 'react';
import { useRouter } from 'next/router';
import { RoleManage } from '@/components/RoleManage';
import { useFetch } from '@/hooks/useFetch';
import { Loader } from '@/components/Loader';
import { AboutPageTooltip } from '@components/AboutPageTooltip';

const Role = () => {
  const router = useRouter();
  const roleId = router.query.roleId as string;

  const {
    data: role,
    loading,
    error,
  } = useFetch<any>(`${process.env.NEXT_PUBLIC_API_URL}/role/${roleId}`, router.isReady);

  const { data: allSeniorityLevels, error: allSeniorityLevelsError } = useFetch<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/seniority_level/`
  );

  if (loading) {
    return <Loader />;
  }
  if (error && allSeniorityLevelsError) {
    router.push('/404');
    return <Loader />;
  }
  return (
    <main className='p-4'>
      {roleId && (
        <RoleManage
          id={roleId}
          name={role.name}
          description={role.description}
          allSeniorityLevels={allSeniorityLevels}
        />
      )}
      <AboutPageTooltip>
        <p className='text-sm'>
          Here you can manage a role by adding seniority levels, you can also add and remove the skills that are
          required to reach each level.
        </p>
      </AboutPageTooltip>
    </main>
  );
};

export default Role;
