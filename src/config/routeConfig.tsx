import { RouteProps } from "react-router-dom"
import { 
    MainPage, 
    SignUpPage, 
    SignInPage,
    ProfilePage, 
    AddBeerPage
} from "../pages"

export enum AppRoutes {
    SIGN_UP = 'sign_up',
    SIGN_IN = 'sign_in',
    MAIN = 'main',
    PROFILE = 'profile',
    ADDBEER = 'add_beer'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.SIGN_UP]: '/sign_up',
    [AppRoutes.SIGN_IN]: '/sign_in',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.ADDBEER]: '/add_beer'
}

export const RouteConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.SIGN_UP]: {
        path: RoutePath.sign_up,
        element: <SignUpPage />
    },
    [AppRoutes.SIGN_IN]: {
        path: RoutePath.sign_in,
        element: <SignInPage />
    },
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}/:id`,
        element: <ProfilePage />
    },
    [AppRoutes.ADDBEER]: {
        path: RoutePath.add_beer,
        element: <AddBeerPage />
    }
}

