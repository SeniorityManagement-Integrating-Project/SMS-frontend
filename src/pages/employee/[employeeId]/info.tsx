import LoginLogout from '@/components/LoginLogout';
import { useUser } from '@auth0/nextjs-auth0/client';
import { create } from 'domain';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const info = () => {
  const [form, setForm] = useState({ name: '', email: '', biography: '', role: '' });
  const [roles, setRoles] = useState([]); // Example roles, you can replace them with your actual roles
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  // const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setDescription(event.target.value);
  // };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, role: event.target.value });
  };

  const handleBiographyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, biography: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send the form data to your backend API for further processing and database storage
    // You can use an HTTP library like Axios to make the API request
    // Example: axios.post('/api/signup', { description, role: selectedRole });
    setEmployee();
  };

  const getEmployeeByEmail = async () => {
    if (!isLoading) {
      const response = await fetch(`/api/employee/getEmployeeByEmail?userEmail=${user?.email}`);
      if (response.status !== 404) {
        router.push(`/profile/${user.sub?.slice(6)}`);
      }
      const data = await response.json();
      setForm({ name: user?.name, email: user?.email, biography: '', role: '' });
    }
  };

  const getAllRoles = async () => {
    const response = await fetch(`/api/role/getAllRoles`);
    const data = await response.json();
    setRoles(data);
  };

  const setEmployee = async () => {
    const response = await fetch(`/api/employee/setEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    if (response.status === 200) {
      router.push(`/profile/${user.sub?.slice(6)}`);
    }
  };

  useEffect(() => {
    getEmployeeByEmail();
  }, [isLoading]);

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div className='bg-slate-900 justify-center items-center h-screen w-screen flex flex-col'>
      <div className='bg-slate-400 rounded-2xl w-96 p-10 flex flex-col'>
        <span className='text-2xl'>Welcome to our Seniority Management System</span>
        <span className='mb-6'>Complete your information for knowing your growth path</span>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='employee-name' className='flex flex-col mb-6'>
              <span>Full name</span>
              <input
                id='employee-name'
                value={form.name}
                disabled
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
              />
            </label>
          </div>
          <div>
            <label htmlFor='employee-email' className='flex flex-col mb-6'>
              <span>Email</span>
              <input
                id='employee-email'
                value={form.email}
                disabled
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
              />
            </label>
          </div>
          <div>
            <label htmlFor='employee-role' className='flex flex-col mb-6'>
              <span>Role in the Company</span>
              <select
                id='employee-role'
                value={form.role}
                onChange={handleRoleChange}
                required
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
              >
                <option value=''>Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor='employee-biography'>
              <span>Biography</span>
              <textarea
                id='employee-biography'
                value={form.biography}
                onChange={handleBiographyChange}
                required
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:border-b-rose-600 focus:outline-rose-600'
              />
            </label>
          </div>
          <div className='flex justify-between'>
            <button type='submit' className='w-32 px-5 py-2 text-sm text-white rounded-md bg-rose-600'>
              Submit
            </button>
            <LoginLogout />
          </div>
        </form>
      </div>
    </div>
  );
};

export default info;
