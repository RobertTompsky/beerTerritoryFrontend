import React, { useState } from 'react';
import { UserWithProfile } from '../../../types/userTypes';
import { CustomButton } from '../../custom/CustomButton/CustomButton';
import { EditProfileForm } from '../../EditProfileForm/EditProfileForm';

interface EditProfileBlockProps {
    user: UserWithProfile | undefined
}
export const EditProfileBlock: React.FC<EditProfileBlockProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div>
            <CustomButton
                children={
                    user?.profile
                        ? 'Редактировать'
                        : 'Создать профиль'
                }
                onClick={()=> setIsOpen(true)}
            />
            {isOpen && <EditProfileForm user={user} setIsOpen={setIsOpen}/>}
        </div>
    );
};
