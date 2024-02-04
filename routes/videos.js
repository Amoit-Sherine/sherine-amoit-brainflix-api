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

  const video = videos.find(video => video.id == id);

  if(video){
    return res.send(video)
  }

  res.status(400).send(
    { "message": "No video with that id exists" }
  );
});

module.exports = router;
