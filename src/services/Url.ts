// End Points for the application Apis && Any thinge 

// https://upskilling-egypt.com:3000

import axios from "axios";

const baseURL = 'https://upskilling-egypt.com:3000/api/v0';

export const axiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization: localStorage.getItem('token'),
    }
});
const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODY1Njc1MWNjYzQ0OGVmODU5ZDQwZGYiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTc1MTY0MTMxMywiZXhwIjoxNzUyODUwOTEzfQ.ytN3chDu9gM8Yr1kbbjst81y5jV33ZbbGp2ySWyZZJQ'
// chat
axiosInstance.interceptors.request.use((config) => {
    const token = tokenTest;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// /admin/users/reset-password
export const ADMIN_URL ={
    RESET_PASSWORD : '/admin/users/reset-password',
    FORGET_PASSWORD: '/admin/users/forgot-password'
}
export const USERS_URL ={
    RESET_PASSWORD : '/portal/users/reset-password',
    FORGET_PASSWORD: '/portal/users/forgot-password',
}
