declare module '*.svelte' {
  const component: any
  export default component
}

type Article = {
  slug: string
  title: string
  description: string
  publicationDate: number
  url: string
  imageUrl: string
  score: number
}
