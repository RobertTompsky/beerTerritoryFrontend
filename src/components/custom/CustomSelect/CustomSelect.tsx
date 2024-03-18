import React from 'react';
import styles from './CustomSelect.module.scss'

export interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        value: string | number,
        title: string | number
    }[],
    defaultOptionTitle: string
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, defaultOptionTitle, value, name, ...rest }) => {

    return (
        <select
            value={value || ''} name={name} {...rest} className={styles.customSelect}>
            <option disabled value={''}>{defaultOptionTitle}</option>
            {options.map((option, index?) => (
                <option key={index} value={option.value}>
                    {option.title}
                </option>
            ))}
        </select>
    );
};
