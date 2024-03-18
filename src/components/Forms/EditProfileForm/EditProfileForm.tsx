import {
    CustomForm,
    CustomInput,
    CustomButton,
    CustomFileLabel,
    CustomFormField
} from '@/components/custom';
import {
    handleZodErrors,
    handleServerErrors,
    handleDataChange,
    handleFileChange,
    handleValidateData
} from '@/lib/utils/functions';

import { profileSchema } from '@/lib/zodSchemas';
import { useUploadImageMutation } from '@/services/endpoints/images/imagesEndpoints';
import {
    useCreateProfileMutation,
    useEditProfileMutation
} from '@/services/endpoints/users/meEndpoints';
import { UploadResponseData } from '@/lib/types/imageTypes';
import { UserWithProfile, ProfileInputData } from '@/lib/types/userTypes';
import React, { useState } from 'react';

interface EditProfileFormProps {
    user: UserWithProfile | undefined,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, setIsOpen }) => {
    const [uploadImage, { isLoading }] = useUploadImageMutation()
    const [createProfile] = useCreateProfileMutation()
    const [editProfile] = useEditProfileMutation()

    const [profileData, setProfileData] = useState<ProfileInputData>({
        realName: user?.profile?.realName || '',
        age: user?.profile?.age || 18,
        bio: user?.profile?.bio || ''
    })
    const [avatar, setAvatar] = useState<File | Blob | undefined>(undefined)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        try {
            handleValidateData(profileSchema, profileData)
            
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
                const profileWithoutAvatar = {
                    ...profileData,
                    avatar: user?.profile?.avatar || ''
                };
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

            <CustomFormField
                title='Имя'
                fieldType='input'
                zodError={errors.realName}
                name='realName'
                value={profileData.realName}
                onChange={(e) => handleDataChange(e, setProfileData)}
            />

            <CustomFormField
                title='Возраст'
                fieldType='input'
                zodError={errors.age}
                name='age'
                value={profileData.age}
                onChange={(e) => handleDataChange(e, setProfileData)}
            />

            <CustomFormField
                title='О себе'
                fieldType='textarea'
                zodError={errors.bio}
                name='bio'
                value={profileData.bio}
                onChange={(e) => handleDataChange(e, setProfileData)}
            />

            <CustomFileLabel
                title='Выберите файл'
                htmlFor='profileFile'
            />
            <CustomInput
                id='profileFile'
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(setAvatar)(e)}
            />

            <CustomButton
                children="Ок"
            />
            {
                isLoading &&
                <div>
                    Ожидание...
                </div>}
            {
                errors.serverErr &&
                <span>
                    {errors.serverErr}
                </span>
            }

        </CustomForm>
    );
};