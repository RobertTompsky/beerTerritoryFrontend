import { FieldError, UseFormRegister } from "react-hook-form";
import { ProfileBody, UserLoginData, UserRegistrationData, ValidUserFieldNames } from "./userTypes";

// типизация компонента FormField для react-hook-form
export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidUserFieldNames;
    register: UseFormRegister<UserRegistrationData | UserLoginData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}