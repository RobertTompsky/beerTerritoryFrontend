import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../services/endpoints/listEndpoints';
import Profile from '../../components/Profile/Profile';
import AddProfileForm from '../../components/ProfileForm/AddProfileForm/AddProfileForm';

export const ProfilePage = () => {
    const {id} = useParams()
    const {data: user} = useGetUserQuery(id as string)
    
    return (
        <div>
            <div>Страница профиля {user?.nickName} {id}</div>
            <Profile user={user}/>
            <AddProfileForm />
        </div>
    );
};