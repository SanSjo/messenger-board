import { createSlice } from '@reduxjs/toolkit';

export const messages = createSlice({
	name: 'messages',
	initialState: {
		messages: [],
		error: null,
	},
	reducers: {
		// Reducer to add a new message with POST request
		addMessage: (state, action) => {
			state = action.payload;
			state.error = action.payload;
		},
		// Reducer show all messages with GET request
		showMessages: (state, action) => {
			state.messages = action.payload;
			state.error = action.payload;
		},
		// Reducer to modify a current message with PUT request
		editMessage: (state, action) => {
			const existingMessage = state.messages.find(
				(message) => message._id === action.payload._id
			);
			existingMessage.message = action.payload.message;
			state.error = action.payload;
		},
		// Reducer to delete a current message with DELETE request
		deleteMessage: (state, action) => {
			state.messages = state.messages.filter(
				(message) => message._id !== action.payload
			);
			state.error = action.payload;
		},
	},
});

// Function that adds a new message with the POST method
export const postMessages = (author, message) => {
	return (dispatch) => {
		fetch('http://localhost:9000/messages', {
			method: 'POST',
			statusCode: 204,
			body: JSON.stringify({ author, message }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then(() => {
				return dispatch(messages.actions.addMessage(author, message));
			})
			.catch(() => {
				dispatch(messages.actions.addMessage({ error: 'can not add mesage' }));
			});

		fetch('http://localhost:9000/messages')
			.then((res) => res.json())
			.then((json) => {
				dispatch(messages.actions.showMessages(json));
			});
	};
};

// Function that fetches all messages with GET method
export const fetchMessages = () => {
	return (dispatch) => {
		fetch('http://localhost:9000/messages')
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				dispatch(messages.actions.showMessages(json));
			});
	};
};

// Function to change a current message
export const editMessages = (message, newValue) => {
	return (dispatch) => {
		fetch(`http://localhost:9000/messages/${message._id}`, {
			method: 'PUT',
			statusCode: 204,
			body: JSON.stringify({ message: newValue }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => res.json())
			.then((newMessageResult) => {
				return dispatch(messages.actions.editMessage(newMessageResult));
			});
	};
};

// Function that deletes a current message with DELETE method
export const deleteMessages = (_id) => {
	return (dispatch) => {
		fetch(`http://localhost:9000/messages/${_id}`, {
			method: 'DELETE',
			statusCode: 204,
			body: JSON.stringify({ _id }),
			headers: { 'Content-Type': 'application/json' },
		}).then(() => {
			return dispatch(messages.actions.deleteMessage(_id));
		});
	};
};
