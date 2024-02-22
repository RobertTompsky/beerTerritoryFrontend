import React from 'react';
import styles from './CustomForm.module.scss'

interface CustomFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    variant?: 'light' | 'dark',
    title: string
}

export const CustomForm: React.FC<CustomFormProps> = ({children, title, ...rest}) => {
    return (
        <form className={styles.customForm} {...rest}>
            <h2>{title}</h2>
            {children}
        </form>
    );
};
