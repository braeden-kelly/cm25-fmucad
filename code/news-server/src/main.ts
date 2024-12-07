import chalk from 'chalk'
import { embed } from './embedder.js'
import { indexName, redis } from './redis-client.js'

const query = 'high on speed'
const count = 1

const searchQuery = '*'
const vectorQuery = `KNN ${count} @embedding $BLOB`
const redisQuery = `(${searchQuery})=>[${vectorQuery}]`

const embedding = await embed(query)
console.log(embedding)

const searchResults = await redis.ft.search(indexName, redisQuery, {
  DIALECT: 2,
  PARAMS: { BLOB: embedding },
  SORTBY: '__embedding_score',
  RETURN: ['title', 'description', 'url', 'imageUrl', 'publicationDate', '__embedding_score']
})

console.dir(searchResults, { depth: null })

await redis.quit()
