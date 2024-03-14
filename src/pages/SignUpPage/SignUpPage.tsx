import React from 'react';
import { Container } from '../../components';
import styles from './SignUpPage.module.scss'
import { SignUpForm } from '@/components/Forms';

export const SignUpPage: React.FC = () => {
    return (
        <div className={styles.signUpPage}>
            <Container>
                <SignUpForm />
            </Container>
        </div>
    );
};