/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useId } from 'react';
import { useInput } from '@/hooks/useInput';
import { Button } from '@components/Button';

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
    <form className='' onSubmit={handleSubmit}>
      <div className='flex flex-col mb-3'>
        <label htmlFor={nameInputId}>Name</label>
        <input
          {...name}
          id={nameInputId}
          className='bg-background-3 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5 focus:border-b-primary focus:outline-primary'
        />
      </div>
      <div className='flex flex-col mb-3'>
        <label htmlFor={nameInputId}>Description</label>
        <input
          {...description}
          id={descriptionInputId}
          className='bg-background-3 border border-gray-300 text-gray-200 text-sm rounded-lg w-full p-2.5 focus:border-b-primary focus:outline-primary'
        />
      </div>

      <div className='flex justify-center mt-4'>
        <Button type='submit'>Create</Button>
      </div>
    </form>
  );
};
