import React from 'react';
import styles from './CustomInput.module.scss'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'light' | 'dark'
}

export const CustomInput: React.FC<CustomInputProps> = ({ value, placeholder, name, onChange, ...rest }) => {
    return (
        <input
            className={styles.customInput}
            value={value}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            {...rest}
        />
    );
};
