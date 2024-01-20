import axios, { AxiosResponse } from 'axios';
import { HistoryQuestion } from '../models/HistoryQuestion';
import { AppUser } from '../models/AppUser';

const sleep = (delay: number) => {
    return new Promise ((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const HistoryQuestions = {
    list: () => requests.get<HistoryQuestion[]>('/HistoryQuestion'),
    details: (id: string) => requests.get<HistoryQuestion>(`/HistoryQuestion/${id}`),
    create: (HistoryQuestion: HistoryQuestion) => axios.post<void>('/HistoryQuestion', HistoryQuestion),
    update: (HistoryQuestion: HistoryQuestion) => axios.put<void>(`/HistoryQuestion/${HistoryQuestion.id}`, HistoryQuestion),
    delete: (id: string) => axios.delete<void>(`/HistoryQuestion/${id}`)
}

const AppUsers = {
    list: () => requests.get<AppUser[]>('/AppUser'),
    details: (id: string) => requests.get<AppUser>(`/AppUser/${id}`),
    create: (appuser: AppUser) => axios.post<void>('/AppUser', appuser),
    update: (appuser: AppUser) => axios.put<void>(`/AppUser/${appuser.id}`, appuser),
    delete: (id: string) => axios.delete<void>(`/AppUser/${id}`)
}

const agent = {
    HistoryQuestions,
    AppUsers
}

export default agent;