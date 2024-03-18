import React from 'react';
import styles from './CustomTextArea.module.scss'

export interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: 'light' | 'dark'
}

export const CustomTextArea: React.FC<CustomTextAreaProps> = ({ value, onChange, name, placeholder, id }) => {
    return (
        <textarea
            className={styles.customTextarea}
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            id={id}
        />
    );
};
