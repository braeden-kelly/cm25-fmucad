<script lang="ts">
  import Router from 'svelte-spa-router'

  import Home from './Home.svelte'
  import Search from './Search.svelte'
  import Article from './Article.svelte'

  const routes = {
    '/': Home,
    '/search/:query': Search,
    '/article/:id': Article
  }
</script>

<header class="flex flex-row bg-redis-deep-hyper text-redis-white w-full p-5">
  <h1 class="flex-shrink text-left bg-redis-deep-hyper font-sans font-bold text-4xl">
    <a href="/">FMMN</a>
  </h1>
  <p class="flex-grow text-center tracking-widest text-3xl font-bold">Florida Man News Network</p>
  <img src="redis-logo-white.svg" alt="Redis logo" class="h-8 mx-4 flex-shrink" />
</header>

<Router {routes} />
