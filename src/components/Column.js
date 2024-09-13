import React from 'react';
import './Column.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';  

function Column({ title, tickets, users }) {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <div className="column-icons">
          {/* Plus Icon */}
          <FontAwesomeIcon icon={faPlus} className="icon-plus" />
          {/* Ellipsis (Three Dots) Icon */}
          <FontAwesomeIcon icon={faEllipsisV} className="icon-ellipsis" />
        </div>
      </div>
      {tickets.map((ticket) => (
        <Card key={ticket.id} ticket={ticket} users={users} />
      ))}
    </div>
  );
}

export default Column;
