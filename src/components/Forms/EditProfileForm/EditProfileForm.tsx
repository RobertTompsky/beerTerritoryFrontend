import { CustomForm, CustomInput, CustomButton, CustomFileLabel } from '@/components/custom';
import { handleZodErrors, handleServerErrors } from '@/lib/utils/functions';
import { profileSchema } from '@/lib/zodSchemas';
import { useUploadImageMutation } from '@/services/endpoints/imagesEndpoints';
import { useCreateProfileMutation, useEditProfileMutation } from '@/services/endpoints/meEndpoints';
import { UploadResponseData } from '@/types/imageTypes';
import { UserWithProfile, ProfileInputData } from '@/types/userTypes';
import React, { useState } from 'react';

interface EditProfileFormProps {
    user: UserWithProfile | undefined,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, setIsOpen }) => {
    const [uploadImage, {isLoading}] = useUploadImageMutation()
    const [createProfile] = useCreateProfileMutation()
    const [editProfile] = useEditProfileMutation()

    const [profileData, setProfileDate] = useState<ProfileInputData>({
        realName: user?.profile?.realName || '',
        age: user?.profile?.age || 18,
        bio: user?.profile?.bio || ''
    })
    const [avatar, setAvatar] = useState<File | Blob | undefined>(undefined)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        const strOrNumValue = Number(value) || value;
        setProfileDate((prevData) => ({ ...prevData, [name]: strOrNumValue }))
    }

    const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files) {
            setAvatar(e.target.files[0])
        }
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        console.log(errors)
        const formData = new FormData()
        try {
            profileSchema.parse(profileData)
            if (avatar) {
                formData.append('avatar', avatar)
                const uploadResponse = await uploadImage(formData)
                const data = uploadResponse as { data: UploadResponseData };
                const profileWithAvatar = { ...profileData, avatar: data?.data?.fileName };
                if (!user?.profile) {
                    await createProfile(profileWithAvatar).unwrap()
                } else {
                    await editProfile(profileWithAvatar).unwrap()
                }
            } else {
                const profileWithoutAvatar = { ...profileData, avatar: user?.profile?.avatar || '' };
                if (!user?.profile) {
                    await createProfile(profileWithoutAvatar).unwrap()
                } else {
                    await editProfile(profileWithoutAvatar).unwrap()
                }
            }
            setIsOpen(false)
        } catch (error) {
            handleZodErrors(error, setErrors)
            handleServerErrors(error, setErrors)
            console.log('Ошибка', error)
        }
    }
    return (
        <CustomForm
            onSubmit={handleSubmit}
            title='Редактирование профиля'>

            <label htmlFor='realName'>Имя</label>
            <CustomInput
                id='realName'
                name='realName'
                value={profileData.realName}
                onChange={handleInputChange}
            />
            {errors.realName && <span>{errors.realName}</span>}

            <label htmlFor='age'>Возраст</label>
            <CustomInput
                id='age'
                name='age'
                value={profileData.age}
                onChange={handleInputChange}
            />
            {errors.age && <span>{errors.age}</span>}

            <label htmlFor='bio'>О себе</label>
            <CustomInput
                id='bio'
                name='bio'
                value={profileData.bio}
                onChange={handleInputChange}
            />
            {errors.bio && <span>{errors.bio}</span>}

            <CustomFileLabel title='Выберите файл' htmlFor='profileFile'/>
            <CustomInput
                id='profileFile'
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
            />

            <CustomButton
                children="Ок"
            />
            {isLoading && <div>Ожидание...</div>}
            {errors.serverErr && <span>{errors.serverErr}</span>}

        </CustomForm>
    );
};