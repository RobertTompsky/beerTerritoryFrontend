import React from 'react';
import { Container } from '@/components';
import { BeersListBlock } from '@/components/blockComponents/BeersListBlock/BeersListBlock';

export const MainPage = () => {
    return (
        <div>
            <Container>
                <div>
                    <BeersListBlock />
                </div>
            </Container>
        </div>
    );
};
