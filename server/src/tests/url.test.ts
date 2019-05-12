import request, { Response } from "supertest";
import app from "../app";
import { encode, decode } from "../utils/shortten";
import {
  urls,
  populateUrls,
  removeUrls,
  shortUrls,
  resetCounter,
  countUrls
} from "./seed/seed";

describe("GET /:shortUrl", () => {
  // Clean up existing urls
  beforeEach(removeUrls);
  // Reset counter so that _id starts at 1
  beforeEach(resetCounter);
  // Populate urls collection
  beforeEach(populateUrls);

  it("should return 200 and longUrl, if shortUrl exists", done =>
    request(app)
      .get(`/${shortUrls[0]}`)
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        try {
          const count = await countUrls();
          // Make sure the number of url documents in the urls collection is the same
          // as the number of urls inserted
          expect(count).toBe(urls.length);
          expect(res.body.longUrl).toBeDefined();
          done();
        } catch (e) {
          done(err);
        }
      }));

  it("should return 404 if shortUrl does not exist", done => {
    // randomShortUrl will never be a valid shortUrl because it has characters
    // that are not in the encode/decode alphabet
    const randomShortUrl = "ae123";
    return request(app)
      .get(`/${randomShortUrl}`)
      .expect(404)
      .end(done);
  });
});

describe("POST /", () => {
  beforeEach(removeUrls);
  beforeEach(resetCounter);

  it("should return 201 and shortUrl", done =>
    request(app)
      .post("/")
      .send({ longUrl: "www.google.com" })
      .expect(201)
      .expect((res: Response) => {
        // we can assume that the url _id is 1, since we clean up the urls collection
        // and reset the counter
        const encodedId = encode(1);
        expect(res.body.shortUrl).toBe(encodedId);
      })
      .end(done));

  it("should return 400 and an error message if longUrl is not a valid URL", done => {
    const invalidLongUrl = "this_is_not_an_url";
    request(app)
      .post("/")
      .send({ longUrl: invalidLongUrl })
      .expect(400)
      .expect((res: Response) => {
        expect(res.body.error).toBeDefined();
      })
      .end(done);
  });
});
