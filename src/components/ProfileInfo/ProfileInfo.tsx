import React from 'react';
import { UserWithProfile } from '../../types/userTypes';
import { CustomButton } from '../custom/CustomButton/CustomButton';
import DefaultAvatar from '../../assets/default_avatar.jpg'
import styles from './ProfileInfo.module.scss'

interface ProfileProps {
    user: UserWithProfile
    setIsOpen: (value: React.SetStateAction<boolean>) => void
}

export const ProfileInfo: React.FC<ProfileProps> = ({ user, setIsOpen }) => {
    const avatar = user?.profile?.avatar
    return (
        <div className={styles.profileInfo}>
            <div className={styles.profileInfo_imgAndBtn}>
                <img
                    className={styles.profileInfo_img}
                    src={
                        avatar
                            ? `${import.meta.env.VITE_API_URL}/images/${avatar}`
                            : DefaultAvatar}
                />
                <CustomButton
                    children={
                        user?.profile
                            ? 'Изменить'
                            : 'Создать'
                    }
                    onClick={() => setIsOpen(true)} 
                    />
            </div>
            <div className={styles.profileInfo_about}>
                <div className={styles.profileInfo_about_fieldnames}>
                    <h3>Никнейм:</h3>
                    <h3>Имя:</h3>
                    <h3>Возраст:</h3>
                    <h3>О себе:</h3>
                </div>
                <div className={styles.profileInfo_about_content}>
                    <h3 className={styles.profileInfo_about_h3}>{user?.nickName}</h3>
                    <h3 className={styles.profileInfo_about_h3}>{user?.profile ? user?.profile?.realName : 'Не заполнено'}</h3>
                    <h3 className={styles.profileInfo_about_h3}>{user?.profile ? user?.profile?.age : 'Не заполнено'}</h3>
                    <h3 className={styles.profileInfo_about_h3}>{user?.profile ? user?.profile?.bio : 'Не заполнено'}</h3>
                </div>
            </div>
        </div>
    );
};
