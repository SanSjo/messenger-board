import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const mongoUrl =
	process.env.MONGO_URL || 'mongodb://localhost/message-board-storytel';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const Message = mongoose.model('Message', {
	id: Number,
	author: Number,
	message: String,
});

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/messages', async (req, res) => {
	const message = await Message.find();
	res.send(message);
});

app.post('/messages', async (req, res) => {
	const message = new Message({
		id: req.body.id,
		author: req.body.author,
		message: req.body.message,
	});
	await message.save();

	res.status(204).json(message);
});

app.put('/messages/:id', async (req, res) => {
	try {
		const message = await Message.findOne({ _id: req.params.id });
		if (req.body.message) {
			message.message = req.body.message;
		}
		await message.save();
		res.status(204).json(message);
	} catch {
		res.status(404).json({ error: 'Message does not exist' });
	}
});

app.delete('/messages/:id', async (req, res) => {
	try {
		await Message.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404).json({ error: 'Message does not exist' });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
