import { FieldError, UseFormRegister } from "react-hook-form";
import { UserLoginData, UserRegistrationData, ValidUserFieldNames } from "./userTypes";

// типизация компонента FormField для react-hook-form
export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidUserFieldNames;
    register: UseFormRegister<UserRegistrationData & UserLoginData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}

export type QueryType = {
    page?: number,
    per_page?: number,
    type: string,
    sort: string
}

export type ServerError = {
    status: string;
    originalStatus: number;
    data: {
        message: string
    }
    error: string;
}