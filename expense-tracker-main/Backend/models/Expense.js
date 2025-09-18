const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    comments: { type: String },
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
