import React from 'react';
import { Container } from '../../components';
import styles from './Header.module.scss'
import { Link } from 'react-router-dom';
import { RoutePath } from '../../config/routeConfig';
import { useAppSelector } from '../../hooks/reduxHooks';
import LOGO from '../../assets/beerbee.png'

export const Header = () => {
    const myId = useAppSelector((state) => state.auth.user?.id)

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header_content}>
                    <div className={styles.header_logoWrapper}>
                        <img 
                        className={styles.header_logo} 
                        src={LOGO} 
                        />
                        <span className={styles.header_title}>BeerBee</span>
                    </div>
                    <nav className={styles.header_nav}>
                        <Link
                            to={RoutePath.main}
                            className={styles.header_link}>
                            Главная
                        </Link>
                        <Link
                            to={RoutePath.add_beer}
                            className={styles.header_link}>
                            Добавить пиво
                        </Link>
                        <Link
                            to={`${RoutePath.profile}/${myId}`}
                            className={styles.header_link}>
                            Мой профиль
                        </Link>
                    </nav>
                </div>
            </Container>
        </div>
    );
};
