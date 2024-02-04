const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

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

router.post('/', jsonParser, async (req, res) => {
    if(!req.body.title || !req.body.description){
        return res.status(400).send({
            "message": "You should supply both a title and description"
        });
    }

    const videos = await getVideos();

    videos.push({
        "id": uuidv4(),
        "title": req.body.title,
        "description": req.body.description,
        "channel": "Red Cow",
        "image": "https://project-2-api.herokuapp.com/images/image0.jpg",
        "views": "0",
        "likes": "0",
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": (new Date()).getTime(),
        "comments": []
    });

    fs.writeFile(path.join(__dirname, './../data/videos.json'), JSON.stringify(videos));
    
    res.send({
        'message': 'Video added successfully'
    });
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
