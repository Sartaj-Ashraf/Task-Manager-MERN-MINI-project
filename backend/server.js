

const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db/connect");

const tasksRouter = require("./routes/tasks");

const PORT = process.env.PORT || 5000;



app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);

const startServer = async () => {
    try {
        await connectDB({url: process.env.MONGO_URL});
        app.listen(PORT, () => {
            console.log(`Server is active and listening on port ${PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect to database", error);
    }
}
startServer();
