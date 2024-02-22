import React, { useState } from 'react';
import { ProfileInputData, UserWithProfile } from '../../types/userTypes';
import { useCreateProfileMutation, useEditProfileMutation } from '../../services/endpoints/meEndpoints';
import { CustomButton } from '../custom/CustomButton/CustomButton';
import { useUploadImageMutation } from '../../services/endpoints/imagesEndpoints';
import { UploadResponseData } from '../../types/imageTypes';

interface EditProfileFormProps {
    user: UserWithProfile | undefined,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({user, setIsOpen}) => {
    const [uploadImage] = useUploadImageMutation()
    const [createProfile] = useCreateProfileMutation()
    const [editProfile] = useEditProfileMutation()
    const [profileData, setProfileDate] = useState<ProfileInputData>({
        realName: user?.profile?.realName || '',
        age: user?.profile?.age || 18,
        bio: user?.profile?.bio || ''
    })
    const [avatar, setAvatar] = useState< File | Blob | undefined>(undefined)

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
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
        const formData = new FormData()
        if (avatar) {
            formData.append('avatar', avatar)
            try {
                const uploadResponse = await uploadImage(formData)
                const data = uploadResponse as { data: UploadResponseData };
                console.log(data)
                const profileWithAvatar = { ...profileData, avatar: data?.data?.fileName };
                console.log(profileWithAvatar)
                if (!user?.profile) {
                    await createProfile(profileWithAvatar).unwrap()
                } else {
                    await editProfile(profileWithAvatar).unwrap()
                }
            } catch (error) {
                console.log('Ошибка', error)
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
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name='realName' value={profileData.realName} onChange={handleInputChange}/>
            <input name='age' value={profileData.age} onChange={handleInputChange}/>
            <input name='bio' value={profileData.bio} onChange={handleInputChange}/>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <CustomButton children="Ок"/>
        </form>
    );
};