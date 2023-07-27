import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { UPDATE_PROFILE } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
// import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';


const ClientProfile = () => {
    const Client = Auth.getUser().data

    const { loading, data, refetch } = useQuery(QUERY_USER, {
        variables: { userId: Client._id },
    });
    const clients = data?.user || {};
    const [updateProfile, { error }] = useMutation(UPDATE_PROFILE)

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedUsername, setEditedUsername] = useState(Client.username);
    const [editedEmail, setEditedEmail] = useState(Client.email);

    const handleEditButtonClick = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSaveButtonClick = async () => {
        try {
          const { data } = await updateProfile({
            variables: {
                userId: Client._id,
                username: editedUsername,
                email: editedEmail,
            },
          });
          localStorage.setItem('id_token', data.updateProfile.token);
          setIsEditMode(false);
          refetch();
        } catch (err) {
          console.error(err);
        }
    };

  return (
    <div>
        <h2>Profile details</h2>
        <div className='username'>
            <h3>Username</h3>
            {isEditMode ? (
            <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
            />
            ) : (
            <p>{Client.username}</p>
            )}
        </div>
        <div className='email'>
        <h3>Email</h3>
            {isEditMode ? (
            <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
            />
            ) : (
            <p>{Client.email}</p>
            )}
        </div>
      {isEditMode ? (
        <button onClick={handleSaveButtonClick}>Save</button>
      ) : (
        <button onClick={handleEditButtonClick}>Edit</button>
      )}
    </div>
  );
};




export default ClientProfile;
