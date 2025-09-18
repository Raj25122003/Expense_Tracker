import React, { createContext, useState, useContext } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

    const updateExpenses = (newExpenses) => {
        setExpenses(newExpenses);
    };

    return (
        <ExpenseContext.Provider value={{ expenses, updateExpenses }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenses = () => useContext(ExpenseContext);
