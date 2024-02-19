import React from 'react';
import { Container } from '../../components';
import styles from './Header.module.scss'
import { Link } from 'react-router-dom';
import { RoutePath } from '../../config/routeConfig';
import { useAppSelector } from '../../hooks/reduxHooks';

export const Header = () => {
    const myId = useAppSelector((state)=> state.auth.user?.id)
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header_content}>
                    <div className={styles.header_logoWrapper}>
                        <img className={styles.header_logo}/>
                    </div>
                    <nav className={styles.header_nav}>
                        <Link to={`${RoutePath.profile}/${myId}`}>Мой профиль</Link>
                    </nav>
                </div>
            </Container>
        </div>
    );
};
