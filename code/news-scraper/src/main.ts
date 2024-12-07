import chalk from 'chalk'
import { embed } from './embedder.js'
import { redis, prefix } from './redis-client.js'
import { JSON_Article, JSON_Item, JSON_Response } from './types/news.js'

/* Fetch the query from the command line args */
const query = process.argv.slice(2).join(' ')

/* Check if the query is empty */
if (query === '') {
  console.error(chalk.red('Please provide a query'))
  process.exit(1)
}

/* build the query URL */
let currentQueryURL: string | undefined = `https://moxie.foxnews.com/search/web?q=${encodeURIComponent(query)}`

/* Loop through all the pages of search results */
while (currentQueryURL !== undefined) {
  /* Fetch the current page of search results */
  const response = await fetch(currentQueryURL)
  const jsonResponse: JSON_Response = await response.json()

  /* Process each item on the page */
  for (const item of jsonResponse.data) {
    await processItem(item)
  }

  /* Update the current query URL */
  currentQueryURL = jsonResponse.links.next
}

await redis.quit()

async function processItem(item: JSON_Item) {
  /* Only process articles */
  if (item.type === 'article') await processArticle(item.attributes)
}

async function processArticle(article: JSON_Article) {
  /* Extract the article data */
  const title = article.title
  const url = article.canonical_url
  const imageUrl = article.thumbnail
  const description = article.description
  const publicationDate = new Date(article.publication_date).getTime() / 1000

  /* Embed the article title and description */
  const embedding = await embed(title ?? '', description ?? '')

  /* Make a unique key for the article */
  const slug = url.split('/').pop()
  const key = `${prefix}:${slug}`

  /* Store the article and embedding in Redis */
  await redis.hSet(key, {
    title: title ?? '',
    url: url,
    imageUrl: imageUrl,
    description: description ?? '',
    publicationDate: publicationDate,
    embedding: embedding
  })

  /* Log the article we just processed */
  console.log(chalk.green('Processed article:'), article.title)
}
