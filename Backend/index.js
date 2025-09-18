const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();
const app = express();




app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes); 

app.get("/", (req, res) => {
    res.send("API is running");
});

const listen =  () => {
    try{
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
        connectDB();
    }catch(error){
        console.log(error);
        
    }
}

listen();


