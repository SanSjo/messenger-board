import React, { useState } from 'react';
import { postMessages } from '../reducers/messages';
import { fetchMessages } from '../reducers/messages';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import '../styles/post-message.css';

export const PostMessage = (event) => {
	const dispatch = useDispatch();

	const [message, setMessage] = useState('');
	const [author, setAuthor] = useState('');

	const handleformSubmit = (event) => {
		event.preventDefault();
		// Creates a new message
		dispatch(postMessages(author, message));
		// Prints out the created message
		dispatch(fetchMessages(author, message));
		setMessage('');
		setAuthor('');
	};

	return (
		<>
			<form onSubmit={handleformSubmit} className="form">
				<div className="formContainer">
					<label className="form-header">
						Please type in your client number and your message below
					</label>
					<label>
						<TextField
							id="standard-multiline-static"
							label="Your client number..."
							className="form-input"
							multiline="true"
							required={true}
							rows={1}
							value={author}
							onChange={(event) => setAuthor(event.target.value)}
						/>
					</label>
					<label>
						<TextField
							id="standard-multiline"
							label="Your message..."
							className="form-input"
							multiline="true"
							required={true}
							rows={4}
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
					</label>

					<button type="submit" className="button" variant="contained">
						Send Message
					</button>
				</div>
				<div className="msg-header-container">
					<h3 className="msg-header"> - MESSAGES - </h3>
				</div>
			</form>
		</>
	);
};
