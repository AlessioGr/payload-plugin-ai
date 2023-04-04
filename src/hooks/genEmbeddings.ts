import { FieldHook } from "payload/types";

export const genEmbeddings: FieldHook = (args) => {
    return args.value;
};
