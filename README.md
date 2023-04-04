# Payload AI plugin

## Installation

`yarn add payload-plugin-ai`

Add this to your payload.config.ts:
```ts
import { ai } from 'payload-plugin-ai';

...

plugins: [
    ai({
      OPENAI_SECRET: process.env.OPENAI_KEY,
    }),
]
```

## Embeddings

![Embeddings generated in the Admin UI](https://user-images.githubusercontent.com/70709113/229883550-5cec9ab9-dc53-4e00-9b47-f3509beb1705.jpg)

## Embeddings

To enable embeddings on a field, simply add this hook to the field:

```ts
import { genEmbeddings } from 'payload-plugin-ai';

...

yourField: {
  ...
  hooks: {
    beforeChange: [
      genEmbeddings,
    ]
  }
}
```

Now, every time you save the collection, embeddings for that field will be generated.

## Other

Project structure inspired by payload-plugin-cloud-storage and pcms-backpop plugin
