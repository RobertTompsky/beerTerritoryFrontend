import React, { useState } from 'react';
import { CustomButton } from '../../components/custom/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/endpoints/authEndpoints';
import { RoutePath } from '../../config/routeConfig';
import { UserRegistrationData } from '../../types/userTypes';

export const SignUpPage = () => {
    const navigate = useNavigate()
    const [register] = useRegisterMutation()
    const [registrationData, setRegistrationData] = useState<UserRegistrationData>({
        nickName: '',
        email: '',
        password: ''
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        setRegistrationData({...registrationData, [name]: value})
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            const response = await register(registrationData).unwrap()
            navigate(`${RoutePath.profile}/${response.id}`)
        } catch (error) {
            console.log('Ошибка', error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='nickName' value={registrationData.nickName} onChange={handleInputChange}/>
                <input name='email' value={registrationData.email} onChange={handleInputChange}/>
                <input name='password' value={registrationData.password} onChange={handleInputChange}/>
                <CustomButton children='OK'/>
                <div>Уже есть аккаунт? <Link to={`${RoutePath.sign_in}`}>Войти</Link></div>
            </form>
        </div>
    );
};