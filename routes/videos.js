const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List of videos');
});

router.post('/', (req, res) => {
  res.send('Add video');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Fetching video with ID: ${id}`);
});

module.exports = router;
