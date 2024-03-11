import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import SignUpForm from "../../features/account/form/SignUpForm";
import LoginForm from "../../features/account/form/LoginForm";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import UsersDashBoard from "../../features/account/dashboard/UsersDashBoard";
import Question_GeographyForm from "../../features/questions/geography/from/Question_GeographyForm";
import QuestionsDashboard from "../../features/questions/dashboard/QuestionsDashboard";
import Question_HistoryForm from "../../features/questions/history/from/Question_HistoryForm";
import Game from "../../features/game/Game";
import QuestionPopUp from "../../features/game/QuestionPopUp";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element: <HomePage />},
            {path: 'homepage', element: <HomePage />},
            {path: 'createQuestionGeography', element: <Question_GeographyForm />},
            {path: 'createQuestionHistory', element: <Question_HistoryForm />},
            {path: 'manage_geography/:id', element: <Question_GeographyForm key = 'manage' />},
            {path: 'manage_history/:id', element: <Question_HistoryForm key = 'manage' />},
            {path: 'questions', element: <QuestionsDashboard />},
            {path: 'game', element: <Game />},
            {path: 'questionpopup', element: <QuestionPopUp />},
            {path: 'signup', element: <SignUpForm />},
            {path: 'login', element: <LoginForm key='manage'/>},
            {path: 'users', element: <UsersDashBoard/>},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ],
    }
]

export const router = createBrowserRouter(routes)