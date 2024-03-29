import { Beer } from "./beerTypes";

export type UserRegistrationData = {
    nickName: string;
    email: string;
    password: string;
};

export type UserLoginData = Omit<UserRegistrationData, 'email'>;

export type UserWithToken = Omit<UserRegistrationData, 'password' | 'email'> & { 
    id: string; 
    token: string; 
};

export type UserIdAndNick = Omit<UserWithToken, 'token'>

export type ValidUserFieldNames = 'nickName' | 'email' | 'password'

export type Profile = {
    id: string
    realName: string,
    age: number,
    bio: string,
    avatar?: string
}

export type ProfileBody = Omit<Profile, 'id'>

export type EditedProfileBody = Partial<Profile>

export type ProfileInputData = Omit<Profile, 'avatar' | 'id'>

export type UserWithProfile = Omit<UserRegistrationData, 'password' | 'email'> & {
    id: string
    profile?: Profile
    favouriteBeers: Beer[]
}