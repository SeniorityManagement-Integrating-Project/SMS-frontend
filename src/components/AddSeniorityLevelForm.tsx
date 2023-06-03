/* eslint-disable jsx-a11y/label-has-associated-control */
import { useInput } from '@/hooks/useInput';
import { Button } from '@/components/Button';
import { FormEvent, useState } from 'react';

export const AddSeniorityLevelForm = ({
  roleId,
  seniorityLevels,
  onSubmit = undefined,
  onSubmitSuccess = undefined,
}: any) => {
  const description = useInput({ type: 'text', name: 'description', initialValue: '' });
  const [seniorityLevelId, setSeniorityLevelId] = useState<number>(-1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/role_seniority_level`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role_id: roleId,
        seniority_level_id: seniorityLevelId,
        description: description.value,
      }),
    }).then((response) => {
      if (response.status === 200 && onSubmitSuccess) {
        onSubmitSuccess();
      }
    });
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col mb-3'>
        <label htmlFor='role-seniority-level'>Seniority level</label>
        <select
          value={seniorityLevelId}
          id='role-seniority-level'
          onChange={(e) => setSeniorityLevelId(Number(e.target.value))}
          className='bg-background-3 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5 focus:border-b-primary focus:outline-primary'
        >
          <option value={-1} disabled>
            Select a seniority level
          </option>
          {seniorityLevels.map((seniorityLevel: any) => (
            <option key={seniorityLevel.id} value={seniorityLevel.id}>
              {seniorityLevel.level} {seniorityLevel.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col mb-3'>
        <label htmlFor='role-seniority-level-description'>Description</label>
        <input
          {...description}
          id='role-seniority-level-description'
          className='bg-background-3 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5 focus:border-b-primary focus:outline-primary'
        />
      </div>
      <div className='flex justify-center mt-4'>
        <Button type='submit' disabled={seniorityLevelId === -1 || description.value === ''}>
          Add
        </Button>
      </div>
    </form>
  );
};
