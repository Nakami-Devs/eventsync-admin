import type {AuthProvider} from "react-admin";

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
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

    checkError: (error) => {
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