const express = require('express');
const router = express.Router();
const videos = require('./../data/videos.json');

router.get('/', (req, res) => {
    res.send(videos.map(video => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        };
    }));
});

router.post('/', (req, res) => {
  res.send('Add video');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Fetching video with ID: ${id}`);
});

module.exports = router;
