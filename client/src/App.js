import React, { useState, useEffect } from 'react';

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ id: '', title: '', description: '' });
  const [updateIssue, setUpdateIssue] = useState({ id: '', title: '', description: '' });

  // READ: Fetch issues from the server
  useEffect(() => {
    fetch('http://localhost:3001/issues')
      .then(response => response.json())
      .then(data => setIssues(data));
  }, []);

  // CREATE: Send a new issue to the server
  const handleCreate = () => {
    fetch('http://localhost:3001/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
    })
      .then(response => response.json())
      .then(data => setIssues([...issues, data]));
  };

  // UPDATE: Send updated issue to the server
  const handleUpdate = () => {
    fetch(`http://localhost:3001/issues/${updateIssue.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateIssue)
    })
      .then(response => response.json())
      .then(data => setIssues(issues.map(issue => (issue.id === data.id ? data : issue))));
  };

  // DELETE: Request the server to delete an issue
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/issues/${id}`, { method: 'DELETE' })
      .then(() => setIssues(issues.filter(issue => issue.id !== id)));
  };

  return (
    <div>
      <h1>Issues Tracker</h1>

      <h2>Create Issue</h2>
      <input
        type="text"
        placeholder="ID"
        value={newIssue.id}
        onChange={(e) => setNewIssue({ ...newIssue, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Title"
        value={newIssue.title}
        onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newIssue.description}
        onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
      />
      <button onClick={handleCreate}>Create Issue</button>

      <h2>Update Issue</h2>
      <input
        type="text"
        placeholder="ID"
        value={updateIssue.id}
        onChange={(e) => setUpdateIssue({ ...updateIssue, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Title"
        value={updateIssue.title}
        onChange={(e) => setUpdateIssue({ ...updateIssue, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={updateIssue.description}
        onChange={(e) => setUpdateIssue({ ...updateIssue, description: e.target.value })}
      />
      <button onClick={handleUpdate}>Update Issue</button>

      <h2>Issues List</h2>
      <ul>
        {issues.map(issue => (
          <li key={issue.id}>
            {issue.title} - {issue.description}
            <button onClick={() => handleDelete(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
