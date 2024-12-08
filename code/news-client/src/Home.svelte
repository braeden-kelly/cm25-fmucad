<script lang="ts">
  import { push } from 'svelte-spa-router'
  let query = ''

  function handleSearch() {
    if (query.trim()) push(`/search/${encodeURIComponent(query)}`)
  }
</script>

<main class="flex flex-col pt-48 items-center w-full">
  <p class="text-3xl pb-4 w-1/2">Search for news articles</p>
  <div class="flex flex-row outline outline-1 outline-redis-midnight rounded-md w-1/2 px-2 py-1 drop-shadow-md bg-redis-white">
    <span class="text-redis-black-50 drop-shadow-sm">🔎</span>
    <input
      class="w-full bg-transparent outline-none px-2"
      type="text"
      bind:value={query}
      on:keydown={(e) => e.key === 'Enter' && handleSearch()}
    />
  </div>
</main>
