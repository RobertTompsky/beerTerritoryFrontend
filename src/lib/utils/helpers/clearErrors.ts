export const clearErrors = (
    setErrors: React.Dispatch<React.SetStateAction<{[key: string]: string}>>,
    time: number
) => {
    setTimeout(() => {
        setErrors({});
    }, time);
}