import React, { useState } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function Card({ ticket, users }) {
  const user = users ? users.find(user => user.id === ticket.userId) : null;
  const [isDone, setIsDone] = useState(false);  

  const toggleDone = () => {
    setIsDone(!isDone);  
  };

  return (
    <div className={`card ${isDone ? 'done' : ''}`}>
      <div className="card-header">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={`check-icon ${isDone ? 'checked' : ''}`}
          onClick={toggleDone}
        />
        <h3>{ticket.id}</h3>
        <img src={user?.profileImage || 'https://via.placeholder.com/30'} alt={user ? user.name : 'Unknown'} className="user-image" />
      </div>
      <p className="title">{ticket.title}</p>
      <div className="feature-request">
        <FontAwesomeIcon icon={faExclamationCircle} className="feature-icon" />
        <span className="feature-text">Feature Request</span>
      </div>
    </div>
  );
}

export default Card;






