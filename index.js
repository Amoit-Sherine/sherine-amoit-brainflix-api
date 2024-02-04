const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.get('/register', (req, res) => {
    res.send({
        "api_key": uuidv4()
    });
});

const checkApiKey = function (req, res, next) {
    if(req.query.api_key && req.query.api_key.length){
        return next()
    }

    res.status(401).send({
        "message": "api_key query parameter required. You may use any string (including your name) as your api_key."
    })
}

// Import the videos router
const videosRouter = require('./routes/videos');

app.use('/videos', checkApiKey, videosRouter);

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
