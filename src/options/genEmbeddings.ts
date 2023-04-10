import { FieldAIModifier } from "../plugin";

export type GenEmbeddingsConfig = {
  visible?: boolean;
};

export const genEmbeddings = (props: GenEmbeddingsConfig): FieldAIModifier => {
  return {
    genEmbeddings: props,
  };
};
