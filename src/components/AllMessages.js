import React from 'react';
import { useSelector } from 'react-redux';
import { DeleteMessage } from './DeleteMessage';
import { EditMessage } from './EditMessage';
import { Card } from 'react-bootstrap';
import '../styles/messages.css';

export const AllMessages = () => {
	const showMessages = useSelector((state) => state.messages.messages);

	return (
		<>
			<section className="section-messages">
				<div className="messageContainer">
					{showMessages.map((message) => (
						<Card key={message._id} className="card-container">
							<Card.Header className="card-header">
								ClientNr: {message.author}
							</Card.Header>
							<Card.Body>
								<Card.Text className="card-text">{message.message}</Card.Text>
								<div className="card-buttons">
									<EditMessage message={message} />
									<DeleteMessage message={message} />
								</div>
							</Card.Body>
						</Card>
					))}
				</div>
			</section>
		</>
	);
};

export default AllMessages;
