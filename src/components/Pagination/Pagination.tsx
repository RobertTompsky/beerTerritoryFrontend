import React from 'react';
import { CustomButton } from '../custom';
import { QueryType } from '@/types/otherTypes';
import styles from './Pagination.module.scss'
import { useGetBeersQuery } from '@/services/endpoints/beers/beerListEndpoints';
import { Beer } from '@/types/beerTypes';

interface PaginationProps {
    query: QueryType
    setQuery: React.Dispatch<React.SetStateAction<QueryType>>
}

export const Pagination: React.FC<PaginationProps> = ({ query, setQuery }) => {
    const {data: totalBeers} = useGetBeersQuery({
        type: '',
        sort: ''
    }) as { data: Beer[] }

    const handlePageChange = (direction: 'prev' | 'next'): void => {
        if (query.per_page && query.page) {
            const totalPages = Math.ceil(totalBeers.length / query.per_page)
            if (direction === 'prev' && query.page > 1) {
                setQuery({ ...query, page: query.page - 1 });
            } else if (direction === 'next' && query.page <= totalPages) {
                setQuery({ ...query, page: query.page + 1 });
            }
        }
    }

    return (
        <div className={styles.pagination}>
            <CustomButton
                children='Назад'
                onClick={() => handlePageChange('prev')}
                disabled={query.page === 1}
            />
            <span>{query.page}</span>
            <CustomButton
                children='Вперед'
                onClick={() => handlePageChange('next')}
                disabled={
                    (query.page && query.per_page &&  
                    query.page === Math.ceil(totalBeers?.length / query.per_page)) as boolean
                }
            />
        </div>
    );
};