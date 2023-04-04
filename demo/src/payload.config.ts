import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Post from "./collections/Post";
import { ai } from "../../src";


export default buildConfig({
  serverURL: 'http://localhost:3000',
  collections: [Post, Users],
  admin: {
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...(config.resolve || {}),
          alias: {
            ...(config.resolve.alias || {}),
            react: path.resolve(__dirname, '../node_modules/react'),
          },
        },
      }
      return newConfig
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [
    ai({
      OPENAI_SECRET: process.env.OPENAI_SECRET,
    }),
  ],
  onInit: async payload => {
    const posts = await payload.find({
      collection: 'posts',
      limit: 1,
    })

    if (!posts.docs.length) {
      await payload.create({
        collection: 'posts',
        data: {
          textArea: 'Pizza is round!',
        },
      })

      await payload.create({
        collection: 'posts',
        data: {
          textArea: 'Payload is a content management system',
        },
      })
    }
  },
})
