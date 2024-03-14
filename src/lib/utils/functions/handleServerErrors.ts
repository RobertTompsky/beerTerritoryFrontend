import { isServerError } from "../checks/isServerError"
import { clearErrors } from "../helpers"

export const handleServerErrors = (
    error: unknown,
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
    ): void => {
    const maybeServerErr = isServerError(error)
    if (maybeServerErr) {
        setErrors({serverErr: error.data.message })
        clearErrors(setErrors, 3000)
    }
}