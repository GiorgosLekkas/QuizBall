import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import HistoryQuestionForm from "../../features/historyquestions/from/HistoryQuestionForm";
import HistoryQuestionDashBoard from "../../features/historyquestions/dashboard/HistoryQuestionDashBoard";
import SignUpForm from "../../features/account/form/SignUpForm";
import LoginForm from "../../features/account/form/LoginForm";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import UsersDashBoard from "../../features/account/dashboard/UsersDashBoard";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element: <HomePage />},
            {path: 'homepage', element: <HomePage />},
            {path: 'createQuestion', element: <HistoryQuestionForm />},
            {path: 'historyquestions', element: <HistoryQuestionDashBoard />},
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