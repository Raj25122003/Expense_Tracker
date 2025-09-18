import React, { useEffect, useRef } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ expenses }) => {
    const chartRef = useRef(null);

    const categories = {};
    expenses.forEach((expense) => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });

    const data = {
        labels: Object.keys(categories),
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, []);

    return (
        <div style={styles.card}>
            <h3 style={styles.title}>Expense Breakdown</h3>
            <Pie data={data} ref={chartRef} />
        </div>
    );
};

const styles = {
    card: {
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "center",
    },
    title: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
};

export default PieChart;
