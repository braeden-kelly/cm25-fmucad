import { pipeline } from '@huggingface/transformers'

/* Load the MiniLM model for feature extraction */
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'fp32' })

/* Embed the input sentences */
async function embed(...sentences: string[]): Promise<Buffer> {
  const text = sentences.join(' ')
  const tensor = await extractor(text, { pooling: 'mean', normalize: true })
  const rawData = tensor.data as Float32Array
  const embedding = Buffer.from(rawData.buffer)
  return embedding
}

/* Export the embed function */
export { embed }
