import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Post from "./collections/Post";
import { ai } from "../../src";
import { getEmbeddings } from "../../src/utils/openAiEmbeddings";
import { Configuration, OpenAIApi } from "openai";
import mongoose, { ConnectOptions } from "mongoose";
import NlpCloudClient from "nlpcloud";

export default buildConfig({
  serverURL: "http://localhost:3000",
  collections: [Post, Users],
  admin: {
    webpack: (config) => {
      const newConfig = {
        ...config,
        resolve: {
          ...(config.resolve || {}),
          alias: {
            ...(config.resolve.alias || {}),
            react: path.resolve(__dirname, "../node_modules/react"),
          },
        },
      };
      return newConfig;
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  plugins: [
    ai({
      OPENAI_SECRET: process.env.OPENAI_SECRET,
      NLPCLOUD_API_KEY: process.env.NLP_CLOUD_API_KEY,
      embeddings: {
        provider: "nlpcloud",
      },
    }),
  ],
  onInit: async (payload) => {
    const posts = await payload.find({
      collection: "posts",
      limit: 1,
    });

    // Mongodb search heree
    const searchTerm = "banane";
    const nlpCloud = new NlpCloudClient(
      "paraphrase-multilingual-mpnet-base-v2",
      process.env.NLP_CLOUD_API_KEY
    );

    const embeddings = (await nlpCloud.embeddings([searchTerm])).data
      .embeddings[0];

    console.log("Embeddings for search term", embeddings);
    const postModel = payload.collections["posts"].Model;

    console.log("Searching...");
    const res = await postModel.aggregate().search({
      index: "embeddings_3",
      knnBeta: {
        vector: embeddings,
        path: "textArea_embeddings",
        k: 10,
      },
    });
    console.log("RES", res);
  },
});
