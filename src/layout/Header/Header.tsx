import styles from './Header.module.scss'
import { Link } from 'react-router-dom';
import ProfileIcon from '@/assets/profileIcon.svg'
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import { RoutePath } from '@/lib/config/routeConfig';
import { logOut } from '@/lib/features/authSlice';
import { CustomButton } from '@/components/custom';
import LittleProfileIcon from '@/assets/profileLittleIcon.svg'
import { Container } from '..';
import { useClickOutside } from '@/lib/hooks/useClickOutside';
import { persistor } from '@/app/store';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const me = useAppSelector((state) => state.auth.user)
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsMenuOpen(false))

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header_content}>

                    <div className={styles.header_logoWrapper}>
                        <span className={styles.header_title}>FLEXBEER</span>
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
                    </nav>

                    {me && <div className={styles.header_content_profile}>

                        <div
                            className={styles.header_profileIconWrapper}
                            onClick={() => setIsMenuOpen(prev => !prev)}>
                            <img
                                src={ProfileIcon}
                                width={50}
                                height={50}
                            />
                        </div>

                        {isMenuOpen &&
                            <div className={styles.header_dropdown} ref={dropdownRef}>
                                <Link
                                    to={`${RoutePath.profile}/${me?.id}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={styles.header_dropdown_link}>
                                    <img src={LittleProfileIcon} width={14} height={14} />
                                    <p>Профиль</p>
                                </Link>
                                <CustomButton
                                    children='Выйти'
                                    variant='delete'
                                    onClick={async () => {
                                        await persistor.purge();
                                        dispatch(logOut())
                                        setIsMenuOpen(false)
                                    }}
                                />
                            </div>}

                    </div>}

                </div>
            </Container>
        </div>
    );
};
