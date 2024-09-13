import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Column from './components/Column';
import './App.css';

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};


const  priorityOrder = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];
const statusOrder = ['Todo', 'In progress', 'Done', 'Canceled'];

// Group tickets by status, user, or priority based on the user's selection
const groupTickets = (tickets, groupBy, users) => {
  const grouped = tickets.reduce((groups, ticket) => {
    let key;

    if (groupBy === 'priority') {
      key = ticket.priority !== undefined ? priorityLabels[ticket.priority] : 'No priority';
    } else if (groupBy === 'status') {
      key = ticket.status || 'Unknown';
    } else if (groupBy === 'user') {
      const user = users.find((user) => user.id === ticket.userId);
      key = user ? user.name : 'Unknown';
    }

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
    return groups;
  }, {});

  // Sort the grouped tickets based on the groupBy selection
  const order = groupBy === 'priority' ? priorityOrder : (groupBy === 'status' ? statusOrder : Object.keys(grouped));
  const sortedGrouped = {};

  order.forEach((key) => {
    // If the key is not in the grouped object, create an empty array
    sortedGrouped[key] = grouped[key] || [];
  });

  return sortedGrouped;
};


// Sort tickets within each group
const sortTickets = (groupedTickets, sortBy) => {
  Object.keys(groupedTickets).forEach((key) => {
    groupedTickets[key].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;  // Higher priority first
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);  // Alphabetical order
      }
      return 0;
    });
  });
  return groupedTickets;
};

function App() {
  const [tickets, setTickets] = useState([]);  // All tickets data
  const [users, setUsers] = useState([]);      // Users data
  const [groupBy, setGroupBy] = useState('priority');  // Default grouping by priority
  const [sortBy, setSortBy] = useState('priority');    // Default sorting by priority
  const [groupedTickets, setGroupedTickets] = useState({});

  // Fetch tickets and users from API when component mounts
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Group tickets by status, user, or priority, and sort them
  useEffect(() => {
    const grouped = groupTickets(tickets, groupBy, users);
    const sorted = sortTickets(grouped, sortBy);
    setGroupedTickets(sorted);
  }, [tickets, groupBy, sortBy, users]);

  return (
    <div className="App">
      {/* Pass both setGroupBy and setSortBy to the Header component */}
      <Header setGroupBy={setGroupBy} setSortBy={setSortBy} />
      <div className="board">
        {Object.keys(groupedTickets).map((group) => (
          <Column 
            key={group} 
            title={group}  // This will show the group name (User, Priority, or Status)
            tickets={groupedTickets[group]} 
            users={users} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
