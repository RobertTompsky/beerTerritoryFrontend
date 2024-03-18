import React, { useState } from 'react';
import { EditProfileForm } from '../../Forms/EditProfileForm/EditProfileForm';
import { ProfileInfo } from '../../ProfileInfo/ProfileInfo';
import { UserWithProfile } from '@/lib/types/userTypes';
import styles from './ProfileInfoBlock.module.scss'

interface ProfileInfoBlockProps {
    user: UserWithProfile
}

export const ProfileInfoBlock: React.FC<ProfileInfoBlockProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className={styles.profileInfoBlock}>
            {isOpen
                ? (<EditProfileForm user={user} setIsOpen={setIsOpen} />)
                : (<ProfileInfo user={user} setIsOpen={setIsOpen} />)
            }
        </div>
    );
};
