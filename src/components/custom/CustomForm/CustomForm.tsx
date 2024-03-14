import React from 'react';
import styles from './CustomForm.module.scss'

interface CustomFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title: string,
    // onFormSubmit: SubmitHandler<UserRegistrationData | UserLoginData>;
}

export const CustomForm: React.FC<CustomFormProps> = ({ children, title, onSubmit, ...rest }) => {
    
    return (
        <form 
        className={styles.customForm}
        onSubmit={onSubmit} 
        {...rest}>
            <h2>{title}</h2>
            {children}
        </form>
    );
};
