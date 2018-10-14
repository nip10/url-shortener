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
}, {
  timestamps: true,
});

UrlSchema.pre('save', next => {
  CounterSchema.findByIdAndUpdate('linkEntryCount', { $inc: { count: 1 } }, { new: true, upsert: true },
    (err, counter) => {
      if (err) { return next(err); }
      this._id = counter.count;
      next();
  });
});

export default mongoose.model<IUrlDocument>('Url', UrlSchema);