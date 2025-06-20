const express = require("express");
const app = express();

const tasksRouter = require("./routes/tasks");

const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
