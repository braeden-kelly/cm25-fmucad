<script lang="ts">
  export let searchResults: Article[] = []
</script>

{#if searchResults.length > 0}
  <ul>
    {#each searchResults as result}
      <li>{result.title}</li>
    {/each}
  </ul>
{:else}
  <p>No results found.</p>
{/if}