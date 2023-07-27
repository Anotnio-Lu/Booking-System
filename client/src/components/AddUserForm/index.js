import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { QUERY_ADMINS } from '../../utils/queries';

const AddUserForm = () => {
    const { loading: adminsLoading, data: adminsData } = useQuery(QUERY_ADMINS);
    const admins = adminsData?.admins || [];

    const [formState, setFormState] = useState({
        admin: '',
        username: '',
        email: '',
        password: '',
        userType: '',
    });

  const [addUser, { loading, error, data }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      setFormState({
        admin: '',
        username: '',
        email: '',
        password: '',
        userType: '',
      });
      window.location.assign('/admin')

    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="admin">Admin:</label>
        <select
          id="admin"
          name="admin"
          value={formState.admin}
          onChange={handleChange}
        >
          <option value="">Select Admin</option>
          {admins.map((admin) => (
            <option key={admin._id} value={admin.username}>
              {admin.username}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          name="userType"
          value={formState.userType}
          onChange={handleChange}
        >
          <option value="ADMIN">Admin</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="CLIENT">Client</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add User'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default AddUserForm;
