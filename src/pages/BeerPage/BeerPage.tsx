import { BeerInfo, Container } from '@/components';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './BeerPage.module.scss'
import { ReviewsBlock } from '@/components/blockComponents';


export const BeerPage = () => {
    const { beerId } = useParams()
    
    return (
        <Container>
            <div className={styles.beerPage}>
                <BeerInfo beerId={beerId}/>
                <section className={styles.reviewsSection}>
                    <h2>Отзывы пользователей</h2>
                    <ReviewsBlock beerId={beerId}/>
                </section>
            </div>
        </Container>
    );
};
