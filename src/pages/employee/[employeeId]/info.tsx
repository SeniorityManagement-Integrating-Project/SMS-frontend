import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

const roles = ['Role 1', 'Role 2', 'Role 3']; // Example roles, you can replace them with your actual roles

const info = () => {
  const [description, setDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [employee, setEmployee] = useState(); // Example employee, you can replace it with your actual employee
  const { user, error, isLoading } = useUser();

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send the form data to your backend API for further processing and database storage
    // You can use an HTTP library like Axios to make the API request
    // Example: axios.post('/api/signup', { description, role: selectedRole });
  };

  const getEmployeeById = async () => {
    if (!isLoading) {
      const response = await fetch(`/api/employee/getEmployeeByEmail?userEmail=${user?.email}`);
      const data = await response.json();
      setEmployee(data);
    }
  };

  useEffect(() => {
    getEmployeeById();
  }, [isLoading]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          value={description}
          onChange={handleDescriptionChange}
          placeholder='Enter description...'
          required
        />
      </div>
      <div>
        <label htmlFor='role'>Role in the Company:</label>
        <select id='role' value={selectedRole} onChange={handleRoleChange} required>
          <option value=''>Select a role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default info;
