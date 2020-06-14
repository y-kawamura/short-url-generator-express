const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const ShortURL = require('./model')

const app = express();
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const shortUrl = await ShortURL.findOne({ slug })
  if (shortUrl) {
    res.redirect(shortUrl.url)
  }
  res.redirect(`/?error=${slug} not found`)
})

app.post('/url', async (req, res, next) => {
  console.log(req.body);
  shortUrl = new ShortURL({
    url: req.body.url,
    slug: req.body.slug,
  })
  try {
    const created = await shortUrl.save()
    res.json(created);
  } catch (error) {
    if (error.message.startsWith('E11000')) {
      error.message = 'Slug in use'
    }
    next(error)
  }
})

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.statusCode = error.status || 500
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack
  })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀Listening on port ${port}`));
