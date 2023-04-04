import type { CollectionConfig } from 'payload/types'
import { genEmbeddings } from "../../../src/hooks/genEmbeddings";

const Post: CollectionConfig = {
    slug: 'posts',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'textArea',
            type: 'textarea',
            hooks: {
                beforeChange: [
                    genEmbeddings,
                ]
            }
        },
    ],
}

export default Post
