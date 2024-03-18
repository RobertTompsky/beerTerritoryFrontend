import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleDataChange = <T>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setData: Dispatch<SetStateAction<T>>
) => {
    const { name, value } = e.target;
    const strOrNumValue = Number(value) || value;
    setData((prevData) => ({ ...prevData, [name]: strOrNumValue }));
};