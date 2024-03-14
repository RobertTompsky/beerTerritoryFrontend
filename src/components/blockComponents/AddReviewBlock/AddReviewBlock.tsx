import React from 'react';
import styles from './AddReviewBlock.module.scss'
import { CustomButton } from '@/components/custom/CustomButton/CustomButton';
import { ReviewForm } from '@/components/Forms';

interface AddReviewBlockProps {
    beerId: string | undefined
    isFormOpen: boolean
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddReviewBlock: React.FC<AddReviewBlockProps> = ({ beerId, isFormOpen, setIsFormOpen }) => {
    return (
        <div className={styles.addReviewBlock}>
            {isFormOpen
                ?
                <div className={styles.addReviewBlock_addForm}>
                    <ReviewForm
                        beerId={beerId}
                        setIsFormOpen={setIsFormOpen}
                    />
                </div>
                :
                <CustomButton
                    children='Добавить отзыв'
                    onClick={() => setIsFormOpen(true)}
                />
            }
        </div>
    );
};
