

const express = require("express");
const app = express();
require("dotenv").config();

// Database
const connectDB = require("./db/connect");
// Routes
const tasksRouter = require("./routes/tasks");
// Middleware
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cors = require("cors");
const PORT = process.env.PORT || 5000;



app.use(express.static("./public"));
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

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
