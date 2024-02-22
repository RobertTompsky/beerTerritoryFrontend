import React, { useState } from 'react';
import { CustomButton } from '../../components/custom/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/endpoints/authEndpoints';
import { RoutePath } from '../../config/routeConfig';
import { UserRegistrationData } from '../../types/userTypes';
import { Container } from '../../components';
import styles from './SignUpPage.module.scss'
import { CustomForm } from '../../components/custom/CustomForm/CustomForm';
import { CustomInput } from '../../components/custom/CustomInput/CustomInput';

export const SignUpPage = () => {
    const navigate = useNavigate()
    const [register] = useRegisterMutation()
    const [registrationData, setRegistrationData] = useState<UserRegistrationData>({
        nickName: '',
        email: '',
        password: ''
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        setRegistrationData({ ...registrationData, [name]: value })
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
        <div className={styles.signUpPage}>
            <Container>
                <CustomForm
                    onSubmit={handleSubmit}
                    title='Регистрация'>
                    <CustomInput
                        name='nickName'
                        placeholder='Введите никнейм пользователя'
                        value={registrationData.nickName}
                        onChange={handleInputChange} />
                    <CustomInput
                        name='email'
                        placeholder='Введите email'
                        value={registrationData.email}
                        onChange={handleInputChange} />
                    <CustomInput
                        name='password'
                        placeholder='Введите пароль'
                        value={registrationData.password}
                        onChange={handleInputChange} />
                    <CustomButton children='Создать аккаунт' />
                    <div>
                        Уже есть аккаунт?
                        <Link to={`${RoutePath.sign_in}`}>
                            Войти
                        </Link>
                    </div>
                </CustomForm>
            </Container>
        </div>
    );
};