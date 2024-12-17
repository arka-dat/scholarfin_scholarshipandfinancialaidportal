const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mock Scholarships Data
const scholarships = [
  { id: 1, name: 'Fullbright Scholarship', amount: '$20,000', deadline: '30 Dec 2024' },
  { id: 2, name: 'Commonwealth Scholarship', amount: '$25,000', deadline: '15 Jan 2025' },
  { id: 3, name: 'Erasmus Mundus Scholarship', amount: '€18,000', deadline: '20 Jan 2025' },
  { id: 4, name: 'Chevening Scholarship', amount: '£30,000', deadline: '10 Feb 2025' },
];

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Scholarships page
app.get('/scholarships', (req, res) => {
  res.render('scholarships', { scholarships });
});

// Apply route
app.get('/apply/:id', (req, res) => {
  const scholarship = scholarships.find((s) => s.id === parseInt(req.params.id));
  if (scholarship) {
    res.send(`<h1>Application Successful for ${scholarship.name}!</h1><a href="/scholarships">Go Back</a>`);
  } else {
    res.status(404).send('<h1>Scholarship not found!</h1>');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
