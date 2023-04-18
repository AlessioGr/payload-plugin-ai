import {
  Configuration,
  OpenAIApi,
  type CreateEmbeddingResponseDataInner,
} from "openai";
import { PluginConfig } from "../plugin";

export const getEmbeddings = async ({
  content,
  config,
}: {
  content: string;
  config: PluginConfig;
}): Promise<number[]> => {
  if (config.embeddings.provider === "nlpcloud") {
    const embeddings = (
      (await config.nlpCloud.embeddings([content])).data as any
    ).embeddings[0];

    console.log("NLP Cloud Embeddings", embeddings);
    return embeddings;
  } else {
    //openai
    const embeddings = await config.openai.createEmbedding({
      input: [content],
      model: "text-embedding-ada-002",
    });

    console.log(embeddings.data.data[0].embedding);

    return embeddings.data.data[0].embedding;
  }
};
