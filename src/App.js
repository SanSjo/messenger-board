import React from 'react';
import MessageBoard from './pages/MessageBoard';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { messages } from './reducers/messages';

function App() {
	const reducer = combineReducers({
		messages: messages.reducer,
	});

	const store = configureStore({
		reducer,
	});

	return (
		<Provider store={store}>
			<MessageBoard />
		</Provider>
	);
}

export default App;
