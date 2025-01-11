import cors from 'cors'
import express, { Express } from 'express'

import { search, fetchArticle } from './search.js'

/* Create the Express app */
const app: Express = express()

/* Use JSON */
app.use(express.json())

/* Enable CORS */
app.use(cors())
app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/* Home route with a status message */
app.get('/', (_req, res) => {
  res.json({ status: 'OK' })
})

/* Search for news articles */
app.get('/search/:query', async (req, res) => {
  const count = 5
  const query = req.params.query

  const searchResults = await search(query, count)
  res.json(searchResults)
})

/* Search for news articles with a custom count */
app.get('/search/:count/:query', async (req, res) => {
  const count = parseInt(req.params.count)
  const query = req.params.query

  /* Validate the count */
  if (isNaN(count)) {
    res.status(400).json({ error: 'Invalid count' })
    return
  }

  const searchResults = await search(query, count)
  res.json(searchResults)
})

/* Get a single article */
app.get('/article/:id', async (req, res) => {
  const id = req.params.id
  const article = await fetchArticle(id)
  res.json(article)
})

/* Start the server */
const server = app.listen(8080, () => {
  console.log('Server is running on port 8080')
})
