import { BeerForm } from '@/components/Forms';
import { Container } from '@/layout';
import { useGetBeerQuery } from '@/services/endpoints/beers/beerListEndpoints';
import { useParams } from 'react-router-dom';
import styles from './EditBeerPage.module.scss'

export const EditBeerPage = () => {
    const {beerId} = useParams()
    const {data: beer} = useGetBeerQuery(beerId as string)
    
    return (
        <div className={styles.page_wrapper}>
            <Container>
                <BeerForm beer={beer}/>
            </Container>
        </div>
    );
};