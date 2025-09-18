const Expense = require("../models/Expense");

// Add a new expense
const addExpense = async (req, res) => {
    const { category, amount, comments } = req.body;

    try {
        const expense = new Expense({
            userId: req.user._id, // Get user ID from the protected route
            category,
            amount,
            comments,
        });

        const createdExpense = await expense.save();
        res.status(201).json(createdExpense);
    } catch (error) {
        res.status(500).json({ message: "Error adding expense", error: error.message });
    }
};

// Get all expenses for a user
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
};

// Update an expense
const updateExpense = async (req, res) => {
    const { category, amount, comments } = req.body;

    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to edit this expense" });
        }

        expense.category = category || expense.category;
        expense.amount = amount || expense.amount;
        expense.comments = comments || expense.comments;

        const updatedExpense = await expense.save();
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error: error.message });
    }
};

// Delete an expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this expense" });
        }

        // Delete the expense
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense removed" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
};


module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};
