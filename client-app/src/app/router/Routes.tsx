import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import HistoryQuestionForm from "../../features/historyquestions/from/HistoryQuestionForm";
import AppUserFrom from "../../features/appusers/form/AppUserFrom";
import AppUserDashBoard from "../../features/appusers/dashboard/AppUserDashBoard";
import HistoryQuestionDashBoard from "../../features/historyquestions/dashboard/HistoryQuestionDashBoard";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element: <HomePage />},
            {path: 'homepage', element: <HomePage />},
            {path: 'createQuestion', element: <HistoryQuestionForm />},
            {path: 'createAppUser', element: <AppUserFrom />},
            {path: 'appusers', element: <AppUserDashBoard />},
            {path: 'historyquestions', element: <HistoryQuestionDashBoard />}
        ],
    }
]

export const router = createBrowserRouter(routes)