/* eslint-disable jsx-a11y/label-has-associated-control */
import { useInput } from '@/hooks/useInput';
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
      <div className='flex flex-col'>
        <label htmlFor='role-seniority-level'>Seniority level</label>
        <select
          value={seniorityLevelId}
          id='role-seniority-level'
          onChange={(e) => setSeniorityLevelId(Number(e.target.value))}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
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
      <div className='flex flex-col'>
        <label htmlFor='role-seniority-level-description'>Descripción</label>
        <input
          {...description}
          id='role-seniority-level-description'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
        />
      </div>
      <div className='flex justify-center mt-4'>
        <button
          type='submit'
          disabled={seniorityLevelId === -1 || description.value === ''}
          className='px-5 py-1 text-lg text-white rounded-full bg-rose-600 '
        >
          Add
        </button>
      </div>
    </form>
  );
};
