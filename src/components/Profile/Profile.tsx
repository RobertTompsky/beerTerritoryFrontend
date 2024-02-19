import React from 'react';
import { UserWithProfile } from '../../types/userTypes';
import { CustomButton } from '../custom/CustomButton/CustomButton';

interface ProfileProps {
    user: UserWithProfile | undefined
}

const Profile: React.FC<ProfileProps> = ({user}) => {
    return (
        <div>
            <div>{user?.profile?.realName}</div>
            <div>{user?.profile?.age}</div>
            <div>{user?.profile?.bio}</div>
            <div>{user?.profile?.avatar}</div>
            <div>{user?.profile?.id}</div>
            <CustomButton children='Редактировать профиль'/>
        </div>
    );
};

export default Profile;