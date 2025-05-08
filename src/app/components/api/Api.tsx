import axios from 'axios';

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const accessToken = JSON.parse(token);

        // If token is present, add it to request's Authorization Header
        if (accessToken) {
            if (config.headers) config.headers.token = accessToken;
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response

        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export const createUser = async (payload) => {
    try {
        const response = await AxiosInstance.post(
            'api/user-create/',
            payload
        )

        return response.data

    } catch (e) {
        throw new Error("Error when creating a user.")
    }
}

export const login = async (payload) => {
    try {
        const response = await AxiosInstance.post(
            'api/auth/',
            payload
        )

        return response.data

    } catch (e) {
        throw new Error("Error logging in.")
    }
}

export const profileList = async () => {
    try {
        const response = await AxiosInstance.get(
            'api/profiles-list/'
        )

        return response.data

    } catch (e) {
        throw new Error("Error getting list.")
    }
}
