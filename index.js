const express = require('express');

const app = express();

// Import the videos router
const videosRouter = require('./routes/videos');

app.use('/videos', videosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
