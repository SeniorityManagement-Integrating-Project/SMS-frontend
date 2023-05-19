/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useId } from 'react';
import { useInput } from '@/hooks/useInput';

interface Props {
  onSubmit: ({ name, description }: { name: string; description: string }) => void;
}

export const BasicForm = ({ onSubmit }: Props) => {
  const name = useInput<string>({ type: 'text', initialValue: '', name: 'name' });
  const description = useInput<string>({ type: 'text', initialValue: '', name: 'description' });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ name: name.value, description: description.value });
    name.setValue('');
    description.setValue('');
  };
  const nameInputId = useId();
  const descriptionInputId = useId();
  return (
    <form className='flex flex-col w-2/3 gap-3 p-8 mx-auto border-2 rounded-md shadow-md' onSubmit={handleSubmit}>
      <h3 className='font-bold'>Create new</h3>
      <div className='flex flex-col'>
        <label htmlFor={nameInputId}>Name</label>
        <input
          {...name}
          id={nameInputId}
          className='bg-background-3 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5 focus:border-b-primary focus:outline-primary'
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor={nameInputId}>Description</label>
        <input
          {...description}
          id={descriptionInputId}
          className='bg-background-3 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5 focus:border-b-primary focus:outline-primary'
        />
      </div>

      <div className='flex justify-center mt-4'>
        <button type='submit' className='w-32 px-5 py-2 text-lg text-white rounded-full bg-rose-600 '>
          Create
        </button>
      </div>
    </form>
  );
};
