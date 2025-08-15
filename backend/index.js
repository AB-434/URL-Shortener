require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const shortId = require('shortid');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  const existingUrl = await ShortUrl.findOne({ originalUrl });
  if (existingUrl) {
    return res.json(existingUrl);
  }

  const shortUrl = new ShortUrl({
    originalUrl,
    shortCode: shortId.generate()
  });

  const result = await shortUrl.save();
  res.json(result);
});

app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const url = await ShortUrl.findOne({ shortCode });

  if (url) {
    url.clicks++;
    url.save();
    return res.redirect(url.originalUrl);
  }

  res.status(404).json({ error: 'URL not found' });
});

app.get('/api/urls', async (req, res) => {
  const urls = await ShortUrl.find().sort({ createdAt: -1 });
  res.json(urls);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));