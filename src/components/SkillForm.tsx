import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import React, { useState } from 'react';

const SkillForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [form, setForm] = useState({ name: '', description: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createSkill = async () => {
      const response = await fetch(`/api/skill/setSkill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        onSubmit();
        await Swal.fire({
          title: 'Created!',
          text: `The skill ${data.name} has been created successfully.`,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      } else if (response.status === 409) {
        await Swal.fire({
          title: 'Error!',
          text: `${data.message}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    };
    createSkill();
    setForm({
      name: '',
      description: '',
    });
  };

  return (
    <form className='flex flex-col w-2/3 gap-3 p-8 mx-auto border-2 rounded-md shadow-md' onSubmit={handleSubmit}>
      <h3 className='font-bold'>Create a new skill</h3>
      <div className='flex flex-col'>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='skill-name'>Name</label>
        <input
          id='skill-name'
          required
          value={form.name}
          type='text'
          name='name'
          onChange={handleChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
        />
      </div>
      <div className='flex flex-col'>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='skill-description'>Description</label>
        <input
          id='skill-description'
          required
          value={form.description}
          type='text'
          name='description'
          onChange={handleChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
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

export { SkillForm };
