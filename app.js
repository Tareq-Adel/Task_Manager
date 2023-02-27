const express = require("express");
const app = express();
const tasks = require("./routes/task");
const { connectDB } = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());
app.use(express.static("./public"));

// routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB();
		app.listen(port, console.log(`server is listing on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
