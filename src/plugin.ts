import type { Config } from "payload/config";
import { GenEmbeddingsConfig } from "./options/genEmbeddings";
import collectionBeforeChangeGenEmbeddings from "./hooks/collectionBeforeChangeGenEmbeddings";
import { Configuration, OpenAIApi } from "openai";
import { Field } from "payload/types";
import NlpCloudClient from "nlpcloud";

export type IncomingPluginConfig = {
  OPENAI_SECRET: string;
  NLPCLOUD_API_KEY: string;
  embeddings: {
    provider: 'openai' | 'nlpcloud';
  }
};
export type PluginConfig = {
  openai: OpenAIApi;
  nlpCloud: NlpCloudClient;
  embeddings: {
    provider: 'openai' | 'nlpcloud';
  }
};

export type FieldAIModifier = Record<string, unknown>;

/*import {
  CollectionConfig as PayloadCollectionConfig,
  Field as PayloadField,
} from "payload/types";

export type Field<BaseField extends PayloadField = PayloadField> = BaseField & {
  ai?: FieldAIModifier;
};

export type AICollectionConfig<
  BaseCollection extends PayloadCollectionConfig = PayloadCollectionConfig
> = Omit<BaseCollection, "fields"> & { fields: Field[] };*/

export const ai =
  (incomingPluginConfig: IncomingPluginConfig) =>
  (config: Config): Config => {
    const configuration = new Configuration({
      apiKey: incomingPluginConfig.OPENAI_SECRET,
    });

    const pluginConfig: PluginConfig = {
      openai: new OpenAIApi(configuration),
      nlpCloud: new NlpCloudClient('paraphrase-multilingual-mpnet-base-v2',incomingPluginConfig.NLPCLOUD_API_KEY),
      embeddings: incomingPluginConfig.embeddings,
    };

    for (const collection of config.collections || []) {
      for (const field of collection.fields) {
        if (
          field.hasOwnProperty("custom") &&
          field.type !== "tabs" &&
          field.type !== "collapsible" &&
          field.type !== "row" &&
          field.type !== "ui"
        ) {
          if (field?.custom?.genEmbeddings) {
            const embeddingsConfig: GenEmbeddingsConfig =
              field.custom?.genEmbeddings;
            console.log("Embeddings config", embeddingsConfig);

            // add hook & field to collection
            collection.fields.push(
              embeddingsField({
                fieldName: field.name + "_embeddings",
                hidden: !embeddingsConfig.visible,
              })
            );

            if (!collection.hooks) {
              collection.hooks = {};
            }
            if (!collection.hooks.beforeChange) {
              collection.hooks.beforeChange = [];
            }
            collection.hooks.beforeChange.push(
              collectionBeforeChangeGenEmbeddings({
                fieldName: field.name,
                embeddingsFieldName: field.name + "_embeddings",
                config: pluginConfig,
              })
            );
          }
        }
      }
    }

    return config;
  };

const embeddingsField = ({
  fieldName,
  hidden = false,
}: {
  fieldName: string;
  hidden?: boolean;
}) => {
  const embeddingsField: Field = {
    name: fieldName,
    type: "number",
    hasMany: true,
    admin: {
      hidden: hidden,
    },
  };
  return embeddingsField;
};
