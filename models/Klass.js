import { ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";

const Klass = mongoose.model(
  "Klass",
  new Schema({
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3, // Sử dụng value thay vì this.name
        message: "Class name must be at least 4 characters. Eg: C211I",
      },
    },
  })
);

export default Klass;
