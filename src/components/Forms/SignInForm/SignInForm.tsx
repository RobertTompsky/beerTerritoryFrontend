import { 
    CustomForm, 
    CustomInput, 
    CustomButton 
} from '@/components/custom';
import { RoutePath } from '@/lib/config/routeConfig';
import { handleZodErrors, handleServerErrors } from '@/lib/utils/functions';
import { loginSchema } from '@/lib/zodSchemas';
import { useLoginMutation } from '@/services/endpoints/authEndpoints';
import { UserLoginData } from '@/types/userTypes';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export const SignInForm: React.FC = () => {
    const navigate = useNavigate()
    const [login, {isLoading}] = useLoginMutation()

    const [loginData, setLoginData] = useState<UserLoginData>({
        nickName: '',
        password: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            loginSchema.parse(loginData)
            const response = await login(loginData).unwrap()
            navigate(`${RoutePath.profile}/${response.id}`)
        } catch (error) {
            handleZodErrors(error, setErrors)
            handleServerErrors(error, setErrors)
            console.log('Ошибка', error);
        }
    }

    return (
        <CustomForm
            onSubmit={handleSubmit}
            title='Вход'>

            <label htmlFor='nickName'>Никнейм</label>
            <CustomInput
                id='nickName'
                name='nickName'
                value={loginData.nickName}
                placeholder='Введите никнейм пользователя'
                onChange={handleInputChange}
            />
            {errors.nickName && <span>{errors.nickName}</span>}

            <label htmlFor='password'>Пароль</label>
            <CustomInput
                id='password'
                name='password'
                value={loginData.password}
                onChange={handleInputChange}
                placeholder='Введите пароль'
            />
            {errors.password && <span>{errors.password}</span>}

            <CustomButton children='Войти' />
            {isLoading && <div>Ожидание...</div>}
            {errors.serverErr && <span>{errors.serverErr}</span>}

            <div>
                Нет аккаунта?{' '}
                <Link to={`${RoutePath.sign_up}`}>
                    Зарегистрироваться
                </Link>
            </div>
        </CustomForm>
    );
};
