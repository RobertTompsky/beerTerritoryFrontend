import React, { useState } from 'react';
import { CustomButton } from '../../components/custom/CustomButton/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/endpoints/authEndpoints';
import { RoutePath } from '../../config/routeConfig';
import { UserLoginData } from '../../types/userTypes';
import { Container } from '../../components';
import { CustomForm } from '../../components/custom/CustomForm/CustomForm';
import { CustomInput } from '../../components/custom/CustomInput/CustomInput';
import styles from './SignInPage.module.scss'

export const SignInPage = () => {
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const [loginData, setLoginData] = useState<UserLoginData>({
        nickName: '',
        password: ''
    })

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
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
        <div className={styles.signInPage}>
        <Container>
                <CustomForm
                    onSubmit={handleSubmit}
                    title='Вход'>
                    <CustomInput
                        name='nickName'
                        value={loginData.nickName}
                        placeholder='Введите никнейм пользователя'
                        onChange={handleInputChange}
                    />
                    <CustomInput
                        name='password'
                        value={loginData.password}
                        onChange={handleInputChange}
                        placeholder='Введите пароль'
                    />
                    <CustomButton children='Войти' />
                    <div>
                        Нет аккаунта? 
                        <Link to={`${RoutePath.sign_up}`}>
                            Зарегистрироваться
                        </Link>
                    </div>
                </CustomForm>
        </Container>
        </div>
    );
};