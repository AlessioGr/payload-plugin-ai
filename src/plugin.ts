import type { Config } from 'payload/config'
import { genEmbeddings } from "./hooks/genEmbeddings";
import {Field} from "payload/types";
import collectionBeforeChangeGenEmbeddings from "./hooks/collectionBeforeChangeGenEmbeddings";

export type PluginConfig = {
    OPENAI_SECRET: string;
}


export const ai =
  (pluginConfig: PluginConfig) =>
  (config: Config): Config => {
  for (const collection of config.collections || []) {
    for (const field of collection.fields) {
      if (field.hasOwnProperty('hooks') && field.type !== "tabs" && field.type !== "collapsible" && field.type !== "row" && field.type !== "ui") {
        let hasEmbeddingsHook = false;
        if (field?.hooks?.beforeChange) {
          hasEmbeddingsHook = !!field.hooks.beforeChange.find(
              (hook) => hook === genEmbeddings
          );
        }
        if (hasEmbeddingsHook) {
          // add hook & field to collection
          collection.fields.push(embeddingsField({fieldName: field.name + "_embeddings"}));

          if(!collection.hooks){
            collection.hooks = {};
          }
          if(!collection.hooks.beforeChange){
            collection.hooks.beforeChange = [];
          }
            collection.hooks.beforeChange.push(collectionBeforeChangeGenEmbeddings({fieldName: field.name, embeddingsFieldName: field.name + "_embeddings", config: pluginConfig}));

        }
      }
    }
  }

  return config;
}


const embeddingsField = ({
  fieldName,
}: {fieldName: string}) => {
  const embeddingsField: Field = {
        name: fieldName,
        type: "text",
  };
  return embeddingsField;
};
