import React, { useState } from "react";
import { addExpense, updateExpense } from "../../utils/api";

const ExpenseForm = ({ existingExpense, onSuccess }) => {
    const [formData, setFormData] = useState(
        existingExpense || { category: "", amount: "", comments: "" }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (existingExpense) {
                await updateExpense(existingExpense._id, formData);
            } else {
                await addExpense(formData);
            }
            onSuccess();
            setFormData({ category: "", amount: "", comments: "" });
        } catch (error) {
            console.error("Error submitting expense:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
            />
            <textarea
                placeholder="Comments"
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
            <button type="submit">{existingExpense ? "Update" : "Add"} Expense</button>
        </form>
    );
};

export default ExpenseForm;
