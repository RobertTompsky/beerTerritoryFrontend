import {
    CustomForm,
    CustomInput,
    CustomButton,
    CustomSelect,
    CustomFileLabel
} from '@/components/custom';
import { RoutePath } from '@/lib/config/routeConfig';
import { BEER_TYPES, VOLUME_OPTIONS } from '@/lib/data';
import { handleZodErrors, handleServerErrors } from '@/lib/utils/functions';
import { beerSchema } from '@/lib/zodSchemas';
import { useAddBeerMutation, useEditBeerMutation } from '@/services/endpoints/beers/manageBeerEndpoints';
import { useUploadImageMutation } from '@/services/endpoints/imagesEndpoints';
import { Beer, BeerInputData } from '@/types/beerTypes';
import { UploadResponseData } from '@/types/imageTypes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BeerForm.module.scss'

interface BeerFormProps {
    beer?: Beer
}

export const BeerForm: React.FC<BeerFormProps> = ({ beer }) => {
    const [addBeer] = useAddBeerMutation()
    const [editBeer] = useEditBeerMutation()
    const [uploadImage, {isLoading}] = useUploadImageMutation()

    const navigate = useNavigate()

    const [beerData, setBeerData] = useState<BeerInputData>({
        name: beer?.name || '',
        brewery: beer?.brewery || '',
        type: beer?.type || '',
        abv: beer?.abv || 0,
        volume: beer?.volume || VOLUME_OPTIONS[0]
    })
    const [image, setImage] = useState<File | Blob | undefined>(undefined)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value } = e.target
        const strOrNumValue = Number(value) || value
        setBeerData({ ...beerData, [name]: strOrNumValue })
    }

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        try {
            beerSchema.parse(beerData)
            if (image) {
                formData.append('avatar', image)
                const uploadResponse = await uploadImage(formData)
                const data = uploadResponse as { data: UploadResponseData };
                const beerWithImage = { ...beerData, image: data?.data?.fileName };

                if (beer?.id) {
                    await editBeer({ ...beerWithImage, id: beer.id }).unwrap()
                } else {
                    await addBeer(beerWithImage).unwrap()
                }
            } else {
                const beerWithoutImage = { ...beerData, image: beer?.image || '' };

                if (beer?.id) {
                    await editBeer({ ...beerWithoutImage, id: beer.id }).unwrap()
                } else {
                    await addBeer(beerWithoutImage).unwrap()
                }
            }
            navigate(`${RoutePath.beer}/${beer?.id}`)
        } catch (error) {
            handleZodErrors(error, setErrors)
            handleServerErrors(error, setErrors)
            console.log('Ошибка', error)
        }
    }

    return (
        <CustomForm
            title={beer ? 'Редактирование пива' : 'Добавление нового пива'}
            onSubmit={handleFormSubmit}
        >
            <label htmlFor='name'>Название</label>
            <CustomInput
                id='name'
                name='name'
                value={beerData.name}
                placeholder='Название...'
                onChange={handleInputChange}
            />
            {errors.name && <span>{errors.name}</span>}

            <label htmlFor='brewery'>Пивоварня</label>
            <CustomInput
                id='brewery'
                name='brewery'
                value={beerData.brewery}
                placeholder='Пивоварня...'
                onChange={handleInputChange}
            />
            {errors.brewery && <span>{errors.brewery}</span>}

            <label htmlFor='type'>Сорт</label>
            <CustomSelect
                id='type'
                name='type'
                value={beerData.type}
                options={BEER_TYPES.map((type) => ({
                    title: type,
                    value: type
                }))}
                defaultOptionTitle='Выбрать сорт пива'
                onChange={handleInputChange}
            />
            {errors.type && <span>{errors.type}</span>}

            <label htmlFor='abv'>Алкоголь, %</label>
            <CustomInput
                id='abv'
                name='abv'
                value={beerData.abv}
                placeholder='Алкоголь...'
                onChange={handleInputChange}
            />
            {errors.abv && <span>{errors.abv}</span>}

            <label htmlFor='volume'>Объем, л.</label>
            <CustomSelect
                id='volume'
                name='volume'
                options={VOLUME_OPTIONS.map((option) => ({
                    value: option,
                    title: option
                }))}
                defaultOptionTitle='Выбрать объем'
                value={beerData.volume}
                onChange={handleInputChange}
            />
            {errors.volume && <span>{errors.volume}</span>}

            <CustomFileLabel title='Выберите файл' htmlFor='beerFile'/>
            <CustomInput
                id='beerFile'
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <CustomButton
                children={beer ? 'Изменить' : 'Добавить'}
            />
            {isLoading && <div>Ожидание...</div>}
            {errors.serverErr && <span>{errors.serverErr}</span>}
        </CustomForm>
    );
};