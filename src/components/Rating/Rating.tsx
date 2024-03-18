import React from 'react';
import styles from './Rating.module.scss'
import { RATING_OPTIONS } from '@/lib/data';
import FilledCircle from '@/assets/filledCircle.png';
import EmptyCircle from '@/assets/emptyCircle.png';
import { Review } from '@/lib/types/reviewTypes';

interface RatingProps {
    review: Review | undefined
}

export const Rating: React.FC<RatingProps> = ({review}) => {
    return (
        <div className={styles.rating}>
            {RATING_OPTIONS.map((_, index) => (
                <img
                    key={index}
                    src={
                        review && index < review?.rating
                            ? FilledCircle
                            : EmptyCircle
                    }
                    width={20}
                    height={20}
                />
            ))}
        </div>
    );
};
