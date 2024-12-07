export type JSON_Response = {
  data: JSON_Item[]
  links: JSON_Links
  meta: JSON_Meta
  numFound: number
}

export type JSON_Item = {
  type: string
  attributes: JSON_Article
}

export type JSON_Links = {
  self: string
  next: string
}

export type JSON_Meta = {
  updated: string
}

export type JSON_Article = {
  title: string
  canonical_url: string
  thumbnail: string
  description: string
  publication_date: string
}

export type Article = {
  title: string
  url: string
  imageUrl: string
  description: string
  publicationDate: number
}
