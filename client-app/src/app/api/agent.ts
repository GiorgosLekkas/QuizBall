import axios, { AxiosError, AxiosResponse } from 'axios';
import { Account, AccountFormValues } from '../models/Account';
import { store } from '../stores/store';
import { router } from '../router/Routes';
import { toast } from 'react-toastify';
import { Question} from '../models/Question';
import { Photo, Profile } from '../models/Profile';

const sleep = (delay: number) => {
    return new Promise ((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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

const Accounts = {
    current: () => requests.get<Account>(`/account`),
    list: () => requests.get<Account[]>('/account/all'),
    login: (user: AccountFormValues) => requests.post<Account>('/account/login', user),
    register: (user: AccountFormValues) => requests.post<Account>('/account/register', user),
    update: (user: AccountFormValues) => requests.put<void>(`/account/${user.id}`, user),
    delete: (id: string) => requests.del<void>(`/account/${id}`)
}

const Questions = {
    list: () => requests.get<Question[]>(`/Question`),
    details: (id: string) => requests.get<Question>(`/Question/${id}`),
    create: (Question: Question) => requests.post<void>(`/Question`, Question),
    update: (Question: Question) => requests.put<void>(`/Question/${Question.id}`, Question),
    delete: (id: string) => requests.del<void>(`/Question/${id}`),
    addPhoto: (file: Blob, Question: Question) => {
        let formData = new FormData();
        formData.append('File', file);
        formData.append('Id', Question.id.toString());
        return axios.put<Photo>(`/photos/addphoto/${Question.id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    },
    deleteQuestionPhoto: (id: string) => axios.delete(`/photos/deletephoto/${id}`),
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    deletePhoto: (id: string) => axios.delete(`/photos/${id}`)
}

const agent = {
    Accounts,
    Questions,
    Profiles
}

export default agent;