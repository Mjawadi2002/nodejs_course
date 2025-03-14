const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRouter');
const tasksRoutes = require('./routes/taskRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', tasksRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
