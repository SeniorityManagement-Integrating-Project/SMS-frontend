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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='employee-name'>
          <span>Full name</span>
          <input id='employee-name' value={form.name} disabled />
        </label>
      </div>
      <div>
        <label htmlFor='employee-email'>
          <span>Email</span>
          <input id='employee-email' value={form.email} disabled />
        </label>
      </div>
      <div>
        <label htmlFor='employee-role'>
          Role in the Company
          <select id='employee-role' value={form.role} onChange={handleRoleChange} required>
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
          <textarea id='employee-biography' value={form.biography} onChange={handleBiographyChange} required />
        </label>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default info;
