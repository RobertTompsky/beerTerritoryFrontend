import { CustomForm, CustomInput, CustomButton } from '@/components/custom';
import { RoutePath } from '@/lib/config/routeConfig';
import { handleZodErrors, handleServerErrors } from '@/lib/utils/functions';
import { registerSchema } from '@/lib/zodSchemas';
import { useRegisterMutation } from '@/services/endpoints/authEndpoints';
import { UserRegistrationData } from '@/types/userTypes';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignUpForm: React.FC = () => {
    const navigate = useNavigate()
    const [register, {isLoading}] = useRegisterMutation()
    const [registrationData, setRegistrationData] = useState<UserRegistrationData>({
        nickName: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        setRegistrationData({ ...registrationData, [name]: value })
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            registerSchema.parse(registrationData)
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

            <label htmlFor='nickName'>Никнейм</label>
            <CustomInput
                id='nickName'
                name='nickName'
                placeholder='Введите никнейм пользователя'
                value={registrationData.nickName}
                onChange={handleInputChange} />
            {errors.nickName && <span>{errors.nickName}</span>}

            <label htmlFor='email'>Email</label>
            <CustomInput
                id='email'
                name='email'
                placeholder='Введите email'
                value={registrationData.email}
                onChange={handleInputChange} />
            {errors.email && <span>{errors.email}</span>}

            <label htmlFor='password'>Пароль</label>
            <CustomInput
                id='password'
                name='password'
                placeholder='Введите пароль'
                value={registrationData.password}
                onChange={handleInputChange} />
            {errors.password && <span>{errors.password}</span>}

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
