<script lang="ts">
  // @ts-ignore: Don't have time to play TypeScript Sudoku for something that should just work
  const newsServerPort = import.meta.env.VITE_NEWS_SERVER_PORT || 8080
  const newsServerUrl = `http://localhost:${newsServerPort}`

  export let params: { query: string }

  let query = decodeURIComponent(params.query)
  let articles: Article[] = []

  async function fetchArticles() {
    const response = await fetch(`${newsServerUrl}/search/5/${params.query}`)
    articles = await response.json()
  }

  $: fetchArticles()

</script>

<main class="flex flex-col pt-12 items-center w-full">

  <h2 class="w-1/2 pb-4 text-3xl">
    Search results for
    <span class="italic">{query}</span>
  </h2>

  <ul class="w-1/2">
    {#each articles as article}
      <li class="flex flex-row pb-6">
        <img class="w-1/6 h-1/6 pt-2 pl-2 pr-6" src={article.imageUrl} alt={article.title} />
        <div>
          <h3>
            <a
              class="line-clamp-1 underline hover:no-underline text-redis-hyper"
              href={`#/article/${article.slug}`}>
              {article.title}
            </a>
          </h3>

          <p class="line-clamp-2 text-ellipsis overflow-hidden">{article.description}</p>
          <p class="text-redis-black-50 text-xl">Score: {article.score}</p>
        </div>
      </li>
    {/each}
  </ul>
</main>
