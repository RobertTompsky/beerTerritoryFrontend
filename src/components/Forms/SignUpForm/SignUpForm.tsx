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
import { registerSchema } from '@/lib/zodSchemas';
import { useRegisterMutation } from '@/services/endpoints/users/authEndpoints';
import { UserRegistrationData } from '@/lib/types/userTypes';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignUpForm: React.FC = () => {
    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()
    const [registrationData, setRegistrationData] = useState<UserRegistrationData>({
        nickName: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            handleValidateData(registerSchema, registrationData)
            
            const response = await register(registrationData).unwrap()
            navigate(`${RoutePath.profile}/${response.id}`)
        } catch (error) {
            handleZodErrors(error, setErrors)
            handleServerErrors(error, setErrors)
            console.log('Ошибка', error)
        }
    }

    return (
        <CustomForm
            onSubmit={handleSubmit}
            title='Регистрация'>

            <CustomFormField
                title='Никнейм'
                fieldType='input'
                name='nickName'
                value={registrationData.nickName}
                onChange={(e) => handleDataChange(e, setRegistrationData)}
                placeholder='Введите никнейм пользователя...'
                zodError={errors.nickName}
            />

            <CustomFormField
                title='Email'
                fieldType='input'
                name='email'
                placeholder='Введите email...'
                value={registrationData.email}
                onChange={(e) => handleDataChange(e, setRegistrationData)}
                zodError={errors.email}
            />

            <CustomFormField
                title='Пароль'
                fieldType='input'
                name='password'
                value={registrationData.password}
                onChange={(e) => handleDataChange(e, setRegistrationData)}
                placeholder='Введите пароль...'
                zodError={errors.password}
            />

            <CustomButton children='Создать аккаунт' />
            {isLoading && <div>Ожидание...</div>}
            {errors.serverErr && <span>{errors.serverErr}</span>}

            <div>
                Уже есть аккаунт?{' '}
                <Link to={`${RoutePath.sign_in}`}>
                    Войти
                </Link>
            </div>
        </CustomForm>
    );
};
