const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
