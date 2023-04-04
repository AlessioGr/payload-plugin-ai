import { Configuration, OpenAIApi, type CreateEmbeddingResponseDataInner } from 'openai';
import {PluginConfig} from "../plugin";

export const getEmbeddings = async ({
                                        content,
                                        config
                                    }: {content: string, config: PluginConfig}): Promise<CreateEmbeddingResponseDataInner[]> => {

    const configuration = new Configuration({
        apiKey: config.OPENAI_SECRET
    });
    const openai = new OpenAIApi(configuration);

    const embeddings = await openai.createEmbedding({
        input: [content],
        model: 'text-embedding-ada-002'
    });

    console.log(embeddings.data.data);

    return embeddings.data.data;
};
