import { CustomInput } from '@/components/custom';
import React, { useState } from 'react';
import styles from './SearchBlock.module.scss'
import { useSearchBeersQuery } from '@/services/endpoints/search';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/lib/config/routeConfig';

export const SearchBlock: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const { isFetching, data: searchResults } = useSearchBeersQuery(searchTerm)
    console.log(searchResults)
    return (
        <div className={styles.searchBlock}>
            <CustomInput
                placeholder='Поиск пива...'
                style={{ width: '100%' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <div className={styles.dropDown}>
                {isFetching
                    ? <div>Поиск...</div>
                    : <div>
                        {searchResults?.map((result) => (
                            <Link to={`${RoutePath.beer}/${result.id}`} className={styles.dropDown_link}>
                                <div className={styles.dropDown_item}>
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/images/${result.image}`}
                                        className={styles.dropDown_item_img}
                                    />
                                    <p>{result.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>}

            </div>}
        </div>
    );
};
