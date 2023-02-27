const mongoose = require("mongoose");

const connectDB = () => {
	mongoose.connect(
		"mongodb://localhost:27017/Task-Manager",
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		},
		() => console.log("connected")
	);
};

module.exports = { connectDB };
