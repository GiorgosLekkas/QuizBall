import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import SignUpForm from "../../features/account/form/SignUpForm";
import LoginForm from "../../features/account/form/LoginForm";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import UsersDashBoard from "../../features/account/dashboard/UsersDashBoard";
import QuestionsDashboard from "../../features/questions/dashboard/QuestionsDashboard";
import Game from "../../features/game/Game";
import QuestionPopUp from "../../features/game/QuestionPopUp";
import RequireAuth from "./RequireAuth";
import RequireAdminRole from "./RequireAdminRole";
import RequireModeratorRole from "./RequireModeratorRole";
import AccessDenied from "../../features/errors/AccessDenied";
import ProfilePage from "../../features/account/profile/ProfilePage";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children:[
            {element: <RequireAdminRole />, children: [
                {path: 'users', element: <UsersDashBoard/>},
            ]},
            {element: <RequireModeratorRole />, children: [
                {path: 'questions', element: <QuestionsDashboard />},
            ]},
            {element: <RequireAuth />, children: [
                {path: 'game', element: <Game />},
                {path: 'questionpopup', element: <QuestionPopUp />},
                {path: 'profile/:userName', element: <ProfilePage />},
            ]},
            {path: '', element: <HomePage />},
            {path: 'homepage', element: <HomePage />},
            {path: 'signup', element: <SignUpForm />},
            {path: 'login', element: <LoginForm key='manage'/>},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: 'accessdenied', element: <AccessDenied />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ],
    }
]

export const router = createBrowserRouter(routes)