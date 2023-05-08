import { useRouter } from 'next/router';
import React from 'react';
import { RoleCard } from '@/components/RoleCard';
import { useFetch } from '@/hooks/useFetch';

const Role = () => {
  const router = useRouter();
  const roleId = router.query.roleId as string;
  const {
    data: role,
    loading,
    error,
    reload,
  } = useFetch<any>(`${process.env.NEXT_PUBLIC_API_URL}/role/${roleId}`, router.isReady);
  const { data: allSeniorityLevels, error: allSeniorityLevelsError } = useFetch<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/seniority_level/`
  );
  if (!role || loading) {
    return <div>Loading...</div>;
  }
  if (error || allSeniorityLevelsError) {
    // eslint-disable-next-line no-console
    console.error({ error }, { allSeniorityLevelsError });
    return <div>Error...</div>;
  }
  return (
    roleId && (
      <div>
        Role: {roleId}
        <RoleCard id={roleId} name={role.name} description={role.description} allSeniorityLevels={allSeniorityLevels} />
      </div>
    )
  );
};

export default Role;
