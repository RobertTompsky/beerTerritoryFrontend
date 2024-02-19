import React, { ButtonHTMLAttributes } from 'react';
import styles from './CustomButton.module.scss'
import classNames from 'classnames';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'delete' | 'approve';
}

export const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'default', children, ...rest }) => {
    const buttonClass = classNames(styles.button, styles[variant]);
    return (
        <button
            className={buttonClass}
            {...rest}>
            {children}
        </button>
    );
};
