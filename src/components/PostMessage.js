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
		dispatch(postMessages(author, message));
		dispatch(fetchMessages(author, message));
		setMessage('');
		setAuthor('');
	};

	return (
		<>
			<form onSubmit={handleformSubmit} className="form">
				<div className="formContainer">
					<label>
						<TextField
							id="standard-multiline-static"
							label="Your clientnumber..."
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
							multiline="true"
							required={true}
							rows={4}
							value={message}
							onChange={(event) => setMessage(event.target.value)}
						/>
					</label>

					<button className="button" variant="contained">
						Send Message
					</button>
				</div>
			</form>
		</>
	);
};
