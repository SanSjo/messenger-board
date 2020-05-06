import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMessages } from '../reducers/messages';
import DeleteIcon from '@material-ui/icons/Delete';
import '../styles/messages.css';

export const DeleteMessage = (props) => {
	const dispatch = useDispatch();

	const handleDeleteButton = (event) => {
		event.preventDefault();
		dispatch(deleteMessages(props.message._id));
	};

	return (
		<div className="delete-button-container">
			<button
				className="delete-button"
				area-label="delete"
				onClick={handleDeleteButton}
			>
				<DeleteIcon />
			</button>
		</div>
	);
};
