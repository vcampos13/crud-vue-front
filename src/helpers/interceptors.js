import axios from 'axios';

export default function errorResponseHandler() {
    axios.interceptors.response.use(undefined, function (error) {
        if (error) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                localStorage.setItem('isLogged',false);
                localStorage.removeItem('userApiToken');
                delete axios.defaults.headers.common['Authorization'];
            }
            return Promise.reject(error);
        }
    });
}
