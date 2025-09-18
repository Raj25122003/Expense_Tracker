import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../utils/api";
import ExpenseForm from "./ExpenseForm";

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);

    const fetchExpenses = async () => {
        try {
            const { data } = await getExpenses();
            // Sort expenses by 'createdAt' field in descending order (latest first)
            const sortedExpenses = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setExpenses(sortedExpenses);
        } catch (error) {
            console.error("Error fetching expenses:", error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="expense-list">
            <h2>Expenses</h2>
            <ExpenseForm
                existingExpense={editingExpense}
                onSuccess={() => {
                    setEditingExpense(null);
                    fetchExpenses();
                }}
            />
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{expense.category}</td>
                            <td>${expense.amount}</td>
                            <td>{new Date(expense.createdAt).toLocaleString()}</td>
                            <td>{new Date(expense.updatedAt).toLocaleString()}</td>
                            <td>{expense.comments}</td>
                            <td>
                                <button onClick={() => setEditingExpense(expense)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(expense._id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
