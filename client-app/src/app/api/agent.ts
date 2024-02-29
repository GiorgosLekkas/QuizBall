import axios, { AxiosError, AxiosResponse } from 'axios';
import { HistoryQuestion } from '../models/HistoryQuestion';
import { Account, AccountFormValues } from '../models/Account';
import { store } from '../stores/store';
import { router } from '../router/Routes';
import { toast } from 'react-toastify';
import { Question_Geography } from '../models/Question_Geography';

const sleep = (delay: number) => {
    return new Promise ((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if( token && config.headers ) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
},(error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorised')
            break;
        case 403:
            toast.error('Forbiden')
            break;
        case 404:
            router.navigate('not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const HistoryQuestions = {
    list: () => requests.get<HistoryQuestion[]>(`/HistoryQuestion`),
    details: (id: string) => requests.get<HistoryQuestion>(`/HistoryQuestion/${id}`),
    create: (HistoryQuestion: HistoryQuestion) => requests.post<void>(`/HistoryQuestion`, HistoryQuestion),
    update: (HistoryQuestion: HistoryQuestion) => requests.put<void>(`/HistoryQuestion/${HistoryQuestion.id}`, HistoryQuestion),
    delete: (id: string) => requests.del<void>(`/HistoryQuestion/${id}`)
}

const QuestionGeography = {
    list: () => requests.get<Question_Geography[]>(`/Question_Geography`),
    details: (id: string) => requests.get<Question_Geography>(`/Question_Geography/${id}`),
    create: (Question_Geography: Question_Geography) => requests.post<void>(`/Question_Geography`, Question_Geography),
    update: (Question_Geography: Question_Geography) => requests.put<void>(`/Question_Geography/${Question_Geography.id}`, Question_Geography),
    delete: (id: string) => requests.del<void>(`/Question_Geography/${id}`)
}

const Account = {
    //current: () => requests.get<Account>('/account'),
    current: () => requests.get<Account>(`/account`),
    list: () => requests.get<Account[]>('/account/all'),
    login: (user: AccountFormValues) => requests.post<Account>('/account/login', user),
    register: (user: AccountFormValues) => requests.post<Account>('/account/register', user)
    
}

const agent = {
    HistoryQuestions,
    Account,
    QuestionGeography
}

export default agent;