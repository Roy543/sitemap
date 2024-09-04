const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Hardcoded issues data
let issues = [
  { id: 1, title: 'Issue 1', description: 'We are having big issue with server' },
  { id: 2, title: 'Issue 2', description: 'We are having big issue with client' }
];

//Accepts a JSON object & logs it
app.post('/issues', (req, res) => {
  const newIssue = req.body;
  issues.push(newIssue);
  console.log('Created:', newIssue);
  res.status(201).send(newIssue);
});

//Returns a static JSON object
app.get('/issues', (req, res) => {
  res.json(issues);
});

//Accepts a JSON object & logs it
app.put('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedIssue = req.body;
  issues = issues.map(issue => (issue.id === id ? updatedIssue : issue));
  console.log('Updated:', updatedIssue);
  res.send(updatedIssue);
});

//Logs out the object or id to delete
app.delete('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  issues = issues.filter(issue => issue.id !== id);
  console.log('Deleted issue with ID:', id);
  res.status(204).send();
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
