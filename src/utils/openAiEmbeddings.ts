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
}): Promise<CreateEmbeddingResponseDataInner[]> => {
  const embeddings = await config.openai.createEmbedding({
    input: [content],
    model: "text-embedding-ada-002",
  });

  console.log(embeddings.data.data);

  return embeddings.data.data;
};
