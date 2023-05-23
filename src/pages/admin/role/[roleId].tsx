import { useRouter } from 'next/router';
import React from 'react';
import { RoleManage } from '@/components/RoleManage';
import { useFetch } from '@/hooks/useFetch';
import { Loader } from '@components/Loader';

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
    roleId && (
      <main className='p-6'>
        <RoleManage
          id={roleId}
          name={role.name}
          description={role.description}
          allSeniorityLevels={allSeniorityLevels}
        />
      </main>
    )
  );
};

export default Role;
