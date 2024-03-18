import {
    CustomForm,
    CustomButton,
    CustomFormField
} from '@/components/custom';
import { RoutePath } from '@/lib/config/routeConfig';
import {
    handleZodErrors,
    handleServerErrors,
    handleDataChange,
    handleValidateData
} from '@/lib/utils/functions';
import { loginSchema } from '@/lib/zodSchemas';
import { useLoginMutation } from '@/services/endpoints/users/authEndpoints';
import { UserLoginData } from '@/lib/types/userTypes';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export const SignInForm: React.FC = () => {
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation()

    const [loginData, setLoginData] = useState<UserLoginData>({
        nickName: '',
        password: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            handleValidateData(loginSchema, loginData)
            
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

            <CustomFormField
                title='Никнейм'
                fieldType='input'
                name='nickName'
                value={loginData.nickName}
                onChange={(e) => handleDataChange(e, setLoginData)}
                placeholder='Введите никнейм пользователя...'
                zodError={errors.nickName}
            />

            <CustomFormField
                title='Пароль'
                fieldType='input'
                name='password'
                value={loginData.password}
                onChange={(e) => handleDataChange(e, setLoginData)}
                placeholder='Введите пароль...'
                zodError={errors.password}
            />

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
