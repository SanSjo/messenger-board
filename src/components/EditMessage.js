import React, { useState } from 'react';
import { editMessages } from '../reducers/messages';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';

import '../styles/messages.css';

export const EditMessage = (props) => {
	const [newValue, setNewValue] = useState('');

	const dispatch = useDispatch();

	const handleEditButton = (event) => {
		event.preventDefault();
		dispatch(editMessages(props.message, newValue));
	};

	return (
		<>
			<div>
				<button
					className="edit-button"
					area-label="edit"
					onClick={handleEditButton}
				>
					<input
						className="edit-input"
						placeholder="Edit message"
						value={newValue}
						onChange={(event) => setNewValue(event.target.value)}
					/>
					<EditIcon className="edit-icon" />
				</button>
			</div>
		</>
	);
};
