import React from 'react';
import styles from './SignUpPage.module.scss'
import { SignUpForm } from '@/components/Forms';
import { Container } from '@/layout';

export const SignUpPage: React.FC = () => {
    return (
        <div className={styles.signUpPage}>
            <Container>
                <SignUpForm />
            </Container>
        </div>
    );
};