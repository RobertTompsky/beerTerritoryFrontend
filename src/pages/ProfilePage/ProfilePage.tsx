import React from 'react';
import { useParams } from 'react-router-dom';
import { UserWithProfile } from '@/lib/types/userTypes';
import { ProfileInfoBlock } from '@/components/blockComponents';
import { useGetUserQuery } from '@/services/endpoints/users/listEndpoints';
import { Container } from '@/layout';
import { FriendsList } from '@/components';
import styles from './ProfilePage.module.scss'
import { BeerCard } from '@/components/BeerCard/BeerCard';

export const ProfilePage: React.FC = () => {
    const { id } = useParams()
    const { data: user } = useGetUserQuery(id as string) as { data: UserWithProfile }

    return (
        <Container>
            <div className={styles.profilePage_wrapper}>
                <section className={styles.topSection}>
                    <ProfileInfoBlock user={user} />
                    <FriendsList />
                </section>
                <section className={styles.favBeersSection}>
                    <h2>Любимое пиво</h2>
                    {user?.favouriteBeers?.length > 0 ? (<nav className={styles.favBeersList}>
                        {user?.favouriteBeers.map((item) => (
                            <BeerCard key={item.id} beer={item}/>
                        ))}
                    </nav>) : <p>Список избранного пива на данный момент пуст</p>}
                </section>
            </div>
        </Container>
    );
};