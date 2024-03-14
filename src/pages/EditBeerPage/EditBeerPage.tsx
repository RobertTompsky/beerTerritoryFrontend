import { BeerForm } from '@/components/Forms';
import { Container } from '@/layout';
import { useGetBeerQuery } from '@/services/endpoints/beers/beerListEndpoints';
import { useParams } from 'react-router-dom';

export const EditBeerPage = () => {
    const {beerId} = useParams()
    const {data: beer} = useGetBeerQuery(beerId as string)
    
    return (
        <div>
            <Container>
                <BeerForm beer={beer}/>
            </Container>
        </div>
    );
};