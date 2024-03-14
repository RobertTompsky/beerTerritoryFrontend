import React from 'react';
import styles from './FriendsList.module.scss'

export const FriendsList: React.FC = () => {
    return (
        <div className={styles.friendsList}>
            <h2>Друзья</h2>
            <nav className={styles.friendsList_nav}>
                <p>Список друзей пуст</p>
            </nav>
        </div>
    );
};
