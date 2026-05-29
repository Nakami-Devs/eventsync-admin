import type { AuthProvider as RAAuthProvider } from 'ra-core';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface LoginParams {
    username: string;
    password: string;
}

interface ErrorResponse {
    status?: number;
}

export const authProvider: RAAuthProvider = {
    login: async ({ username, password }: LoginParams) => {
        try{
            const response = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username,
                    password: password
                }),
            })

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message || 'Connexion échouée');
            }

            const {token, admin} = await response.json();

            localStorage.setItem('token', token);
            localStorage.setItem('admin', JSON.stringify(admin));

            return Promise.resolve();
        } catch(error){
            return Promise.reject(error);
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        return Promise.resolve();
    },

    checkAuth: () => {
    const token = localStorage.getItem('token');
    return token ? Promise.resolve() : Promise.reject();
    },

    checkError: (error: ErrorResponse) => {
    const status = error.status;
    if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        return Promise.reject();
    }
    return Promise.resolve();
    },

    getPermissions: () => {
    const admin = localStorage.getItem('admin');
    return admin ? Promise.resolve(JSON.parse(admin)) : Promise.reject();
    },
}