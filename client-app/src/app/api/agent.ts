import axios, { AxiosResponse } from 'axios';
import { HistoryQuestion } from '../models/HistoryQuestion';

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

const agent = {
    HistoryQuestions
}

export default agent;