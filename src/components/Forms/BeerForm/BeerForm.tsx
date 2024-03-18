import {
    CustomForm,
    CustomInput,
    CustomButton,
    CustomFileLabel,
    CustomFormField
} from '@/components/custom';
import { RoutePath } from '@/lib/config/routeConfig';
import { BEER_TYPES, VOLUME_OPTIONS } from '@/lib/data';
import {
    handleZodErrors,
    handleServerErrors,
    handleDataChange,
    handleValidateData,
    handleFileChange
} from '@/lib/utils/functions';
import { beerSchema } from '@/lib/zodSchemas';
import {
    useAddBeerMutation,
    useEditBeerMutation
} from '@/services/endpoints/beers/manageBeerEndpoints';
import { useUploadImageMutation } from '@/services/endpoints/images/imagesEndpoints';
import { Beer, BeerInputData } from '@/lib/types/beerTypes';
import { UploadResponseData } from '@/lib/types/imageTypes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BeerFormProps {
    beer?: Beer
}

export const BeerForm: React.FC<BeerFormProps> = ({ beer }) => {
    const [addBeer] = useAddBeerMutation()
    const [editBeer] = useEditBeerMutation()
    const [uploadImage, { isLoading }] = useUploadImageMutation()

    const navigate = useNavigate()

    const [beerData, setBeerData] = useState<BeerInputData>({
        name: beer?.name || '',
        brewery: beer?.brewery || '',
        type: beer?.type || '',
        abv: beer?.abv || '',
        volume: beer?.volume || ''
    })
    const [image, setImage] = useState<File | Blob | undefined>(undefined)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        try {
            handleValidateData(beerSchema, beerData)

            if (image) {
                formData.append('avatar', image)
                const uploadResponse = await uploadImage(formData)
                const data = uploadResponse as { data: UploadResponseData };
                const beerWithImage = { ...beerData, image: data?.data?.fileName };

                if (beer?.id) {
                    await editBeer({ ...beerWithImage, id: beer.id }).unwrap()
                    navigate(`${RoutePath.beer}/${beer?.id}`)
                } else {
                    const response = await addBeer(beerWithImage).unwrap()
                    navigate(`${RoutePath.beer}/${response.id}`)
                }
            } else {
                const beerWithoutImage = { ...beerData, image: beer?.image || '' };

                if (beer?.id) {
                    await editBeer({ ...beerWithoutImage, id: beer.id }).unwrap()
                    navigate(`${RoutePath.beer}/${beer?.id}`)
                } else {
                    const response = await addBeer(beerWithoutImage).unwrap()
                    navigate(`${RoutePath.beer}/${response.id}`)
                }
            }
        } catch (error) {
            handleZodErrors(error, setErrors)
            handleServerErrors(error, setErrors)
            console.log('Ошибка', error)
        }
    }

    return (
        <CustomForm
            title={
                beer
                    ? 'Редактирование пива'
                    : 'Добавление нового пива'
            }
            onSubmit={handleFormSubmit}
        >
            <CustomFormField
                fieldType='input'
                title='Название'
                name='name'
                value={beerData.name}
                placeholder='Название...'
                onChange={(e) => handleDataChange(e, setBeerData)}
                zodError={errors.name}
            />

            <CustomFormField
                fieldType='input'
                title='Пивоварня'
                name='brewery'
                value={beerData.brewery}
                placeholder='Пивоварня...'
                onChange={(e) => handleDataChange(e, setBeerData)}
                zodError={errors.brewery}
            />

            <CustomFormField
                fieldType='select'
                title='Сорт'
                name='type'
                value={beerData.type}
                options={BEER_TYPES.map((type) => ({
                    title: type,
                    value: type
                }))}
                defaultOptionTitle='Выбрать сорт пива'
                onChange={(e) => handleDataChange(e, setBeerData)}
                zodError={errors.type}
            />

            <CustomFormField
                fieldType='input'
                title='Алкоголь, %'
                name='abv'
                value={beerData.abv}
                placeholder='Алкоголь...'
                onChange={(e) => handleDataChange(e, setBeerData)}
                zodError={errors.abv}
            />

            <CustomFormField
                fieldType='select'
                title='Объем, л.'
                name='volume'
                options={VOLUME_OPTIONS.map((option) => ({
                    value: option,
                    title: option
                }))}
                defaultOptionTitle='Выбрать объем'
                value={beerData.volume}
                onChange={(e) => handleDataChange(e, setBeerData)}
                zodError={errors.volume}
            />

            <CustomFileLabel title='Выберите файл' htmlFor='beerFile' />
            <CustomInput
                id='beerFile'
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(setImage)(e)}
            />

            <CustomButton
                children={beer ? 'Изменить' : 'Добавить'}
            />
            {isLoading && <div>Ожидание...</div>}
            {errors.serverErr &&
                <span>
                    {errors.serverErr}
                </span>
            }
        </CustomForm>
    );
};