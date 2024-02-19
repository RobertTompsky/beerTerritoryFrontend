import React, { useState } from 'react';
import { CustomButton } from '../../components/custom/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/endpoints/authEndpoints';
import { RoutePath } from '../../config/routeConfig';
import { UserLoginData } from '../../types/userTypes';

export const SignInPage = () => {
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const [loginData, setLoginData] = useState<UserLoginData>({
        nickName: '',
        password: ''
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target
        setLoginData({...loginData, [name]: value})
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            const response = await login(loginData).unwrap()
            navigate(`${RoutePath.profile}/${response.id}`)
        } catch (error) {
            console.log('Ошибка', error)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='nickName' value={loginData.nickName} onChange={handleInputChange}/>
                <input name='password' value={loginData.password} onChange={handleInputChange}/>
                <CustomButton children='OK'/>
                <div>Нет аккаунта? <Link to={`${RoutePath.sign_up}`}>Зарегистрироваться</Link></div>
            </form>
        </div>
    );
};