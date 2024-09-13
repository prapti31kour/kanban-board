import React from 'react';

function Header({ setGroupBy, setSortBy }) {
  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);  
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);  
  };

  return (
    <div className="header">
      <button className="display-btn">Display Options</button>
      <div className="display-options">
        <label>Group By: </label>
        <select onChange={handleGroupChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>

        <label>Sort By: </label>
        <select onChange={handleSortChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
