import mongoose from './../config/db';
import CounterSchema from './counter';

export interface IUrlDocument extends mongoose.Document {
  url: string,
}

const UrlSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
  },
  hits: {
    type: Number,
    default: 0,
  }
}, {
    timestamps: true,
  });

UrlSchema.pre('save', function(next) {
  const foo = this;
  CounterSchema.findByIdAndUpdate('linkEntryCount', { $inc: { count: 1 } }, { new: true, upsert: true },
    (err, counter) => {
      if (err) { return next(err); }
      foo._id = counter.count;
      return next();
    });
});

export default mongoose.model<IUrlDocument>('Url', UrlSchema);
