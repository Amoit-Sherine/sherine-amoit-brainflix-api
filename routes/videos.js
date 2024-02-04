const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async (req, res) => {
    const videos = await getVideos();

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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const videos = await getVideos();

  const video = videos.find(video => video.id == id);

  if(video){
    return res.send(video)
  }

  res.status(400).send(
    { "message": "No video with that id exists" }
  );
});

async function getVideos() {
    try {
      const data = await fs.readFile(path.join(__dirname, './../data/videos.json'));
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
}

module.exports = router;
