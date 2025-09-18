import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (formData) => API.post("/auth/login", formData);
export const signup = (formData) => API.post("/auth/register", formData);
export const getExpenses = () => API.get("/expenses");
export const addExpense = (expense) => API.post("/expenses", expense);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
export const updateExpense = (id, expense) => API.put(`/expenses/${id}`, expense);
