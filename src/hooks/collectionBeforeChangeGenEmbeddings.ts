import { getEmbeddings } from "../utils/openAiEmbeddings";
import { PluginConfig } from "../plugin";
import { CollectionBeforeChangeHook } from "payload/types";

const collectionBeforeChangeGenEmbeddings: ({
  fieldName,
  embeddingsFieldName,
  config,
}: {
  fieldName: string;
  embeddingsFieldName: string;
  config: PluginConfig;
}) => CollectionBeforeChangeHook =
  ({ fieldName, embeddingsFieldName, config }) =>
  async (args) => {
    const toEmbedText = args.data[fieldName];

    const embeddings = await getEmbeddings({
      content: toEmbedText,
      config: config,
    });
    if (embeddings && embeddings?.length > 0) {
      console.log("Embeddings length", embeddings.length);
      args.data[embeddingsFieldName] = embeddings;
    }

    return args.data;
  };

export default collectionBeforeChangeGenEmbeddings;
