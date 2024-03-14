import { BeerCard } from '@/components/BeerCard/BeerCard';
import { useGetBeersQuery } from '@/services/endpoints/beers/beerListEndpoints';
import React, { useState } from 'react';
import styles from './BeersListBlock.module.scss'
import { QueryType } from '@/types/otherTypes';
import { Pagination } from '@/components';
import { CustomButton, CustomSelect } from '@/components/custom';
import { BEER_TYPES, SORT_OPTIONS } from '@/lib/data';
import { SearchBlock } from '..';
import { Beer } from '@/types/beerTypes';

export const BeersListBlock: React.FC = () => {
    const [query, setQuery] = useState<QueryType>({
        page: 1,
        per_page: 6,
        type: '',
        sort: ''
    })
    const { data: AllBeers } = useGetBeersQuery({
        type: '',
        sort: '',
        page: 1,
        per_page: 228
    }) as { data: Beer[] }
    const { data: beers } = useGetBeersQuery(query) as { data: Beer[] }


    console.log(beers?.length)
    console.log(query)
    return (
        <section className={styles.beersListBlock}>

            <div className={styles.beersListBlock_bars}>
                <div className={styles.beersListBlock_bars_typeSelect}>
                    <CustomSelect
                        name='type'
                        value={query.type}
                        defaultOptionTitle='Фильтрация по стилю пива'
                        options={BEER_TYPES.map((beerType) => ({
                            value: beerType,
                            title: beerType
                        }))}
                        onChange={(e) => {
                            setQuery(
                                {
                                    ...query,
                                    type: e.target.value,
                                    page: 1,
                                    per_page: 6
                                }
                            )
                        }}
                    />
                    {query && query.type.length > 0 &&
                        <CustomButton
                            children='Сброс'
                            variant='delete'
                            onClick={() => setQuery(
                                {
                                    ...query,
                                    type: '',
                                    page: 1
                                }
                            )}
                        />}
                </div>
                <SearchBlock />
                <CustomSelect
                    name='sort'
                    value={query.sort}
                    defaultOptionTitle='Сортировать'
                    options={SORT_OPTIONS.map((sortOption) => ({
                        value: sortOption.query,
                        title: sortOption.title
                    }))}
                    onChange={(e) => setQuery(
                        {
                            ...query,
                            sort: e.target.value,
                            page: 1
                        }
                    )}
                />
            </div>

            {
                beers && beers.length > 0
                    ? <nav className={styles.beersListBlock_list}>
                        {beers.map((beer) => (
                            <BeerCard
                                beer={beer}
                                key={beer.id}
                            />
                        ))}
                    </nav>
                    : <h3>Список пива пуст</h3>
            }

            {
                AllBeers &&
                beers &&
                query &&
                query.per_page &&
                AllBeers.length > query.per_page &&
                <Pagination
                    query={query}
                    setQuery={setQuery}
                />
            }
        </section>
    );
};
