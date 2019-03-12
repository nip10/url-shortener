import mongoose from "./../config/db";

export interface ICounterDocument extends mongoose.Document {
  count: number;
}

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

export default mongoose.model<ICounterDocument>("Counter", CounterSchema);
