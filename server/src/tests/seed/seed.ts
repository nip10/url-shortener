import Url from './../../models/url';
import Counter from './../../models/counter';
import logger from './../../utils/logger';

export const urls = [
  {
    _id : 1,
    hits : 0,
    url : 'http://www.google.com',
  },
  {
    _id : 2,
    hits : 3,
    url : 'http://www.youtube.com',
  },
];

export const populateUrls = (done: jest.DoneCallback) => {
  const url1 = new Url({ url: urls[0].url }).save();
  const url2 = new Url({ url: urls[1].url }).save();
  return Promise.all([url1, url2])
    .then(() => done())
    .catch(err => logger.error("Error populating urls collection.", err));
}

export const removeUrls = (done: jest.DoneCallback) => {
  Url.deleteMany({})
    .then(() => done())
    .catch(err => logger.error("Error deleting urls collection.", err));
}

export const resetCounter = (done: jest.DoneCallback) => {
  Counter.findByIdAndUpdate('linkEntryCount', { count: 0 }, { new: true, upsert: true},
    (err, counter) => {
      if (err) { throw new Error(err); }
      if (counter.count !== 0) { throw new Error('Error updating counter value to 0.')}
      return done();
    });
}

export const countUrls = () => {
  return Url.countDocuments({})
    .then((count) => count)
    .catch(err => logger.error("Error counting url documents.", err));
}

// shortUrl '3' decodes to longUrl _id = 1
// shortUrl '4' decodes to longUrl _id = 4
export const shortUrls = ['3', '4'];