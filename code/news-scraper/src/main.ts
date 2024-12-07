import chalk from 'chalk'
import { embed } from './embedder.js'
import { redis, prefix } from './redis-client.js'
import { JSON_Article, JSON_Item, JSON_Response } from './types/news.js'

const query = 'florida man'
const maxPageCount = 5
const queryInterval = 1000

let currentQueryURL = `https://moxie.foxnews.com/search/web?q=${encodeURIComponent(query)}`
let pagesCompleted = 0

await processPage()

/* Don't slam the API with requests */
const handle = setInterval(async () => {
  /* Stop when we reach the maximum page count */
  if (pagesCompleted >= maxPageCount) {
    clearInterval(handle)
    await redis.quit()
    return
  }

  /* Process the next page */
  processPage()
}, queryInterval)

async function processPage() {
  /* Fetch the current page of search results */
  const response = await fetch(currentQueryURL)
  const jsonResponse: JSON_Response = await response.json()

  /* Process each item on the page */
  for (const item of jsonResponse.data) processItem(item)

  /* Update the current query URL and page count */
  currentQueryURL = jsonResponse.links.next
  pagesCompleted++

  /* Log the progress */
  console.log(chalk.red('Processing page'), pagesCompleted)
}

function processItem(item: JSON_Item) {
  /* Only process articles */
  if (item.type === 'article') processArticle(item.attributes)
}

async function processArticle(article: JSON_Article) {
  /* Log the article we are processing */
  console.log(chalk.green('Processing article:'), article.title)

  /* Extract the article data */
  const title = article.title
  const url = article.canonical_url
  const imageUrl = article.thumbnail
  const description = article.description
  const publicationDate = new Date(article.publication_date).getTime() / 1000

  /* Embed the article title and description */
  const embedding = await embed(title, description)

  /* Make a unique key for the article */
  const slug = url.split('/').pop()
  const key = `${prefix}:${slug}`

  /* Store the article and embedding in Redis */
  redis.hSet(key, { title, url, imageUrl, description, publicationDate, embedding })
}
