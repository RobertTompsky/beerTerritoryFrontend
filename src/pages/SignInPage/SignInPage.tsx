import { Container } from '@/layout';
import React from 'react';
import styles from './SignInPage.module.scss'
import { SignInForm } from '@/components/Forms';

export const SignInPage: React.FC = () => {
    return (
        <div className={styles.signInPage}>
            <Container>
                <SignInForm />
            </Container>
        </div>
    );
};