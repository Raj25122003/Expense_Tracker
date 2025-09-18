import React, { useState, useEffect } from "react";
import ExpenseList from "../components/Expenses/ExpenseList";
import PieChart from "../components/Expenses/PieChart";
import { getExpenses } from "../utils/api";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout");
            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Error logging out", err);
        }
    };

    const fetchExpenses = async () => {
        try {
            const { data } = await getExpenses();
            setExpenses(data);
        } catch (error) {
            console.error("Error fetching expenses:", error.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Expense Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="dashboard-content">
                <ExpenseList />
                <div className="dashboard-chart">
                    <PieChart expenses={expenses} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
