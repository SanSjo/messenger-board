import { createSlice } from '@reduxjs/toolkit';

export const messages = createSlice({
	name: 'messages',
	initialState: {
		messages: [],
		error: null,
	},
	reducers: {
		addMessage: (state, action) => {
			console.log(action);
			state = action.payload;
			state.error = action.payload;
		},
		showMessages: (state, action) => {
			console.log(state);
			state.messages = action.payload;
		},
		editMessage: (state, action) => {
			console.log(action);
			const existingMessage = state.messages.find(
				(message) => message._id === action.payload._id
			);
			console.log(existingMessage);
			console.log(state.messages);
			existingMessage.message = action.payload.message;
		},
		deleteMessage: (state, action) => {
			console.log(state);
			state.messages = state.messages.filter(
				(message) => message._id !== action.payload
			);
		},
	},
});

export const postMessages = (author, message) => {
	console.log(message);
	return (dispatch) => {
		fetch('http://localhost:8080/messages', {
			method: 'POST',
			statusCode: 204,
			body: JSON.stringify({ author, message }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then(() => {
				return dispatch(messages.actions.addMessage(author, message));
			})
			.catch((err) => {
				console.log('Error', err);
				dispatch(
					messages.actions.addMessage({ error: 'Can not add new message' })
				);
			});

		fetch('http://localhost:8080/messages')
			.then((res) => res.json())
			.then((json) => {
				dispatch(messages.actions.showMessages(json));
			});
	};
};

export const fetchMessages = () => {
	return (dispatch) => {
		fetch('http://localhost:8080/messages')
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				dispatch(messages.actions.showMessages(json));
			});
	};
};

export const editMessages = (message, newValue) => {
	return (dispatch) => {
		fetch(`http://localhost:8080/messages/${message._id}`, {
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

export const deleteMessages = (_id) => {
	return (dispatch) => {
		fetch(`http://localhost:8080/messages/${_id}`, {
			method: 'DELETE',
			statusCode: 204,
			body: JSON.stringify({ _id }),
			headers: { 'Content-Type': 'application/json' },
		}).then(() => {
			return dispatch(messages.actions.deleteMessage(_id));
		});
	};
};
