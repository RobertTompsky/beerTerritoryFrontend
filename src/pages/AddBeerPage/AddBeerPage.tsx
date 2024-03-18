import { BeerForm } from '@/components/Forms';
import { Container } from '@/layout';
import styles from './AddBeerPage.module.scss'

export const AddBeerPage = () => {
    return (
        <div className={styles.page_wrapper}>
            <Container>
                <BeerForm />
            </Container>
        </div>
    );
};
