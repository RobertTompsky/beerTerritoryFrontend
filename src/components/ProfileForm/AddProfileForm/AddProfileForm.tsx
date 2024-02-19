import React, { useState } from 'react';
import { ProfileInputData } from '../../../types/userTypes';
import { useCreateProfileMutation } from '../../../services/endpoints/meEndpoints';
import { CustomButton } from '../../custom/CustomButton/CustomButton';

const AddProfileForm = () => {
    const [createProfile] = useCreateProfileMutation()
    const [profileData, setProfileDate] = useState<ProfileInputData>({
        realName: '',
        age: 18,
        bio: ''
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        setProfileDate({...profileData, [name]: value})
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            await createProfile(profileData).unwrap()
        } catch (error) {
            console.log('Ошибка', error)
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <input name='realName' value={profileData.realName} onChange={handleInputChange}/>
            <input name='age' value={profileData.age} onChange={handleInputChange}/>
            <input name='bio' value={profileData.bio} onChange={handleInputChange}/>
            <CustomButton children="Ок"/>
        </form>
    );
};

export default AddProfileForm;