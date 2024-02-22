import React from 'react';
import { UserWithProfile } from '../../types/userTypes';
import { CustomButton } from '../custom/CustomButton/CustomButton';
import DefaultAvatar from '../../assets/default_avatar.jpg'
import styles from './ProfileInfo.module.scss'
interface ProfileProps {
    user: UserWithProfile | undefined
}

export const ProfileInfo: React.FC<ProfileProps> = ({ user }) => {
    const avatar = user?.profile?.avatar
    return (
        <div className={styles.profileInfo}>
            <img
                className={styles.profileInfo_img}
                src={
                    avatar
                        ? `${import.meta.env.VITE_API_URL}/images/${avatar}`
                        : DefaultAvatar}
            />
            <div className={styles.profileInfo_about}>
                <div className={styles.profileInfo__about_fieldnames}>
                    <h3>Никнейм:</h3>
                    <h3>Имя:</h3>
                    <h3>Возраст:</h3>
                    <h3>О себе:</h3>
                </div>
                <div className={styles.profileInfo__about_content}>
                    <h3>{user?.nickName}</h3>
                    <h3>{user?.profile ? user?.profile?.realName : 'Не заполнено'}</h3>
                    <h3>{user?.profile ? user?.profile?.age : 'Не заполнено'}</h3>
                    <h3>{user?.profile ? user?.profile?.bio : 'Не заполнено'}</h3>
                </div>
            </div>
        </div>
    );
};
