import React from 'react';
import styles from './CustomFileLabel.module.scss'

interface CustomFileLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    title: string
}

export const CustomFileLabel: React.FC<CustomFileLabelProps> = ({ title, htmlFor }) => {
    return (
        <label htmlFor={htmlFor} className={styles.customFileLabel}>
            {title}
        </label>
    );
};
