# Payload AI plugin

[![npm version](https://badge.fury.io/js/payload-plugin-ai.svg)](https://badge.fury.io/js/payload-plugin-ai)

ATTENTION: This plugin currently requires a custom fork of payload to work (replace `payload` with `yarn add alessiogr/payload#production-with-custom`). This is because this plugins depends on two PRs which haven't been merged into payload yet:

- [PR 1 (custom property)](https://github.com/payloadcms/payload/pull/2436)
- [PR 2 (hasMany numbers)](https://github.com/payloadcms/payload/pull/2517)

In this repository I will add a bunch of AI stuff! Currently, it can just generate embeddings for fields using the OpenAI API. Expect things to break with updates without notice.

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

Project structure inspired by [payload-plugin-cloud-storage](https://github.com/payloadcms/plugin-cloud-storage) and [pcms-backpop](https://github.com/TimHal/pcms-backpop)
