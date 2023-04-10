import { genEmbeddings } from "../../../src/options/genEmbeddings";
import { CollectionConfig } from "payload/types";

const Post: CollectionConfig = {
  slug: "posts",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "textArea",
      type: "textarea",
      custom: {
        ...genEmbeddings({ visible: true }),
      },
    },
  ],
};

export default Post;
