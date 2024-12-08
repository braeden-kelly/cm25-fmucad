<script lang="ts">
  export let onSearch
  let query = ''

  function handleSearch() {
    if (query.trim() onSearch(query)
  }
</script>

<div>
  <span>🔎</span>
  <input
    type="text"
    bind:value={query}
    placeholder="See what Florida Man is up to..."
    on:keydown={(e) => e.key === 'Enter' && handleSearch()} />
</div>
