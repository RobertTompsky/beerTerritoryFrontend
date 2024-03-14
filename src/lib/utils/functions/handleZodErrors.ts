import { z } from "zod";
import { clearErrors } from "../helpers";

export const handleZodErrors = (
    error: unknown, 
    setErrors: React.Dispatch<React.SetStateAction<{[key: string]: string}>>
): void => {
    if (error instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
            if (err.path) {
                validationErrors[err.path[0]] = err.message;
            }
        });
        setErrors(validationErrors)
        clearErrors(setErrors, 3000)
    }
}
