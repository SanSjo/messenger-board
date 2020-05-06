import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostMessage } from '../components/PostMessage';
import { AllMessages } from '../components/AllMessages';
import { Header } from '../components/Header';
import { fetchMessages } from '../reducers/messages';
import '../styles/messageboard.css';

export const MessageBoard = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMessages());
	}, [dispatch]);

	return (
		<>
			<Header />
			<div className="body-container">
				<div className="form-container">
					<PostMessage />
				</div>
				<div className="message-container">
					<AllMessages />
				</div>
			</div>
		</>
	);
};

export default MessageBoard;
