import { useGetBeerQuery } from '@/services/endpoints/beers/beerListEndpoints';
import React from 'react';
import styles from './BeerInfo.module.scss'
import DefaultBeerImg from '@/assets/beerjpg.jpg'
import { CustomButton } from '../custom';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/lib/config/routeConfig';
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import {
    useAddBeerToFavMutation,
    useDeleteBeerMutation,
    useRemoveBeerFromFavMutation
} from '@/services/endpoints/beers/manageBeerEndpoints';

interface BeerInfoProps {
    beerId: string | undefined
}

export const BeerInfo: React.FC<BeerInfoProps> = ({ beerId }) => {
    const userId = useAppSelector((state) => state.auth.user?.id)
    const { data: beer } = useGetBeerQuery(beerId as string)
    const [deleteBeer] = useDeleteBeerMutation()
    const [addBeerToFav] = useAddBeerToFavMutation()
    const [removeBeerFromFav] = useRemoveBeerFromFavMutation()
    const navigate = useNavigate()

    const isBeerExistsInMyFav = beer?.favouriteInUsers.some((user) => user.id === userId) as boolean
    const img = beer?.image
    const isCreatedByMe: boolean = beer?.creatorId === userId

    return (
        <section className={styles.beerInfo}>

            <div className={styles.beerInfo_imgWrapper}>
                <img
                    className={styles.beerInfo_img}
                    src={img
                        ? `${import.meta.env.VITE_API_URL}/images/${img}`
                        : DefaultBeerImg}
                />
            </div>

            <div className={styles.beerInfo_textBlock}>
                <h3 className={styles.beerInfo_textBlock_title}>{beer?.name}</h3>
                <div className={styles.beerInfo_textBlock_cols}>
                    <div className={styles.beerInfo_textBlock_cols_leftCol}>
                        <p className={styles.beerInfo_textBlock_p}>Пивоварня:</p>
                        <p className={styles.beerInfo_textBlock_p}>Сорт:</p>
                        <p className={styles.beerInfo_textBlock_p}>Алкоголь:</p>
                        <p className={styles.beerInfo_textBlock_p}>Объем:</p>
                    </div>
                    <div className={styles.beerInfo_textBlock_cols_rightCol}>
                        <p className={styles.beerInfo_textBlock_p}>{beer?.brewery}</p>
                        <p className={styles.beerInfo_textBlock_p}>{beer?.type}</p>
                        <p className={styles.beerInfo_textBlock_p}>{beer?.abv}%</p>
                        <p className={styles.beerInfo_textBlock_p}>{beer?.volume} л.</p>
                    </div>
                </div>
                <div className={styles.btn_group}>
                    <div className={styles.btn_group_editAndFav}>
                        <CustomButton
                            children='Изменить'
                            onClick={
                                () =>
                                    navigate(`${RoutePath.beer}/${beerId}${RoutePath.edit_beer}`)
                            }
                        />
                        {!isBeerExistsInMyFav
                            ? <CustomButton
                                children='В любимое'
                                variant='approve'
                                onClick={async () =>
                                    await addBeerToFav(beerId as string)
                                }
                            />
                            : <CustomButton
                                children='Из любимого'
                                variant='delete'
                                onClick={async () =>
                                    await removeBeerFromFav(beerId as string)
                                }
                            />
                        }
                    </div>
                    {
                        isCreatedByMe &&
                        <CustomButton
                            children='Удалить'
                            variant='delete'
                            onClick={async () => {
                                await deleteBeer(beerId as string)
                                navigate(`${RoutePath.main}`)
                            }}
                        />
                    }
                </div>
            </div>
        </section>
    );
};
