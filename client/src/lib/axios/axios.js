import Axios from "axios";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = Axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = sessionStorage.getItem("token");

        if (!token) {
            const { data, error } = await supabase.auth.refreshSession();

            if (error) {
                return Promise.reject(error);
            }

            token = data.session.access_token;
            sessionStorage.setItem("token", token);
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        if (error.response?.status === 401) {
            const { data, error: refreshError } = await supabase.auth.refreshSession();

            if (refreshError) {
                return Promise.reject(refreshError);
            }

            const newToken = data.session.access_token;
            sessionStorage.setItem("token", newToken);

            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(error.config);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
