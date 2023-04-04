import { FieldHook } from "payload/types";

const genEmbeddings: FieldHook = (args) => {
    return args.value;
};

export default genEmbeddings;
