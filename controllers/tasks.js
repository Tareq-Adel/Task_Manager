const asyncWrapper = require("../middleware/async");
const Tasks = require("../models/task");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Tasks.find({});
	res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Tasks.create(req.body);
	res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Tasks.findOne({ _id: taskID });

	if (!task) {
		return next(
			createCustomError(`Their is not task with ID: ${taskID}`, 404)
		);
	}
	res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Tasks.findOneAndDelete({ _id: taskID });

	if (!task) {
		return res.status(404).json({
			msg: `Their is not task with ID: ${taskID}`,
		});
	}

	res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Tasks.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!task) {
		return res.status(404).json({
			msg: `Their is not task with ID: ${taskID}`,
		});
	}

	res.status(201).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
