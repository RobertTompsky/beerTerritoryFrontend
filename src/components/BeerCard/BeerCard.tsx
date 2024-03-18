import { Beer } from '@/lib/types/beerTypes';
import React from 'react';
import styles from './BeerCard.module.scss'
import DefaultBeerImg from '@/assets/beerjpg.jpg'
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/lib/config/routeConfig';
import ViewsIcon from '@/assets/viewIcon.svg'

interface BeerCardProps {
    beer: Beer | undefined
}

export const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
    const navigate = useNavigate()

    const img = beer?.image

    return (
        <div
            className={styles.beerCard}
            onClick={() => navigate(`${RoutePath.beer}/${beer?.id}`)}
        >
            <img
                className={styles.beerCard_img}
                src={img
                    ? `${import.meta.env.VITE_API_URL}/images/${img}`
                    : DefaultBeerImg}
            />
            <div className={styles.beerCard_info}>
                <p className={styles.beerCard_title}>{beer?.name}</p>
                <div className={styles.beerCard_otherInfo}>
                    <p className={styles.beerCard_p}>{beer?.brewery}</p>
                    <p className={styles.beerCard_p}>{beer?.type}</p>
                    <div className={styles.beerCard_views}>
                        <img
                            src={ViewsIcon}
                            width={20}
                            height={20}
                        />
                        <p className={styles.beerCard_p}>{beer?.viewsCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
