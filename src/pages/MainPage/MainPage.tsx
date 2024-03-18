import { BeersListBlock } from '@/components/blockComponents';
import { Container } from '@/layout';
import React from 'react';

export const MainPage: React.FC = () => {
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
