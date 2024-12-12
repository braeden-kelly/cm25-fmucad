<script lang="ts">
  // @ts-ignore: Don't have time to play TypeScript Sudoku for something that should just work
  const newsServerPort = import.meta.env.VITE_NEWS_SERVER_PORT || 8080
  const newsServerUrl = `http://localhost:${newsServerPort}`

  export let params
  let id = params.id

  // @ts-ignore
  let article: Article = {}
  let date: Date = new Date()

  async function fetchArticle() {
    const response = await fetch(`${newsServerUrl}/article/${id}`)
    article = await response.json()
    date = new Date(article.publicationDate * 1000)
  }

  $: fetchArticle()
</script>

<main class="flex flex-col pt-12 items-center w-full">

  <p
    class="w-1/2 item-right border-b-2 bold font-mono text-redis-midnight border-b-redis-hyper pb-1 mb-4 text-2xl">
      {date.toDateString()}
  </p>

  <h2 class="text-4xl w-1/2 pb-10">
    {article.title}
  </h2>

  <div class="flex flex-row w-1/2 pb-10">

    <p class="w-1/3">
      {article.description}
      <br/>
      <a
        class="underline hover:no-underline text-redis-hyper"
        href={article.url}>
          Read more...
      </a>
    </p>
    <img class="w-2/3 pl-12" src={article.imageUrl} alt={article.title} />
  </div>
</main>
