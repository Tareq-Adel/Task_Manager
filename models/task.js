const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "the name value is required"],
		trim: true,
		maxLength: [20, "the name must have maximum 20 character"],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Task", TaskSchema);
