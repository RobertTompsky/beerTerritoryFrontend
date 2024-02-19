import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteConfig, RoutePath } from '../config/routeConfig';
import { SignInPage, SignUpPage } from '../pages';
import { useAppSelector } from '../hooks/reduxHooks';

export const AppRouter = () => {
    const isAuthed = useAppSelector((state) => state.auth.isAuthenticated)

    return (
        <Routes>
            <Route
                path={RoutePath.sign_in}
                element={<SignInPage />}
            />
            <Route
                path={RoutePath.sign_up}
                element={<SignUpPage />}
            />
            {Object.values(RouteConfig).slice(2).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={isAuthed
                        ? element
                        : <Navigate to={RoutePath.sign_in} />}
                />
            ))}
        </Routes>
    );
};

// Object.values(RouteConfig).slice(2) означает, что мы превращаем RouteConfig в массив защищенных путей, который содержит элементы, кроме первых двух
