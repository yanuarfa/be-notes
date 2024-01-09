import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

type TNote = InferSchemaType<typeof noteSchema>;

export default model<TNote>("Note", noteSchema);
