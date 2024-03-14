import { RouteProps } from "react-router-dom"
import { 
    MainPage, 
    SignUpPage, 
    SignInPage,
    ProfilePage, 
    AddBeerPage,
    BeerPage,
    EditBeerPage
} from "../../pages"


export enum AppRoutes {
    SIGN_UP = 'sign_up',
    SIGN_IN = 'sign_in',
    MAIN = 'main',
    PROFILE = 'profile',
    ADD_BEER = 'add_beer',
    BEER = 'beer',
    EDIT_BEER = 'edit_beer'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.SIGN_UP]: '/sign_up',
    [AppRoutes.SIGN_IN]: '/sign_in',
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.ADD_BEER]: '/add_beer',
    [AppRoutes.BEER]: '/beer',
    [AppRoutes.EDIT_BEER]: '/edit_beer'
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
    [AppRoutes.ADD_BEER]: {
        path: RoutePath.add_beer,
        element: <AddBeerPage />
    },
    [AppRoutes.BEER]: {
        path: `${RoutePath.beer}/:beerId`,
        element: <BeerPage />
    },
    [AppRoutes.EDIT_BEER]: {
        path: `${RoutePath.beer}/:beerId${RoutePath.edit_beer}`,
        element: <EditBeerPage />
    }

}

