import { Request, Response } from "express";
import { encode, decode } from "./../utils/shortten";
import logger from "./../utils/logger";
import Url from "../models/url";
import _ from "lodash";
import { isURL } from "validator";

const getUrl = async (req: Request, res: Response) => {
  const shortUrl = _.get(req.params, "shortUrl");
  if (!_.isString(shortUrl)) {
    // TODO: This should redirect to the homepage and show an error message
    // Something like this..
    // return res.redirect("https://sh.diogocardoso.me/?error=BAD_REQUEST");
    return res.sendStatus(400);
  }
  const id = decode(shortUrl);
  const update = { $inc: { hits: 1 } };
  try {
    const { url } = await Url.findByIdAndUpdate(id, update);
    logger.info(`Requested shortUrl ${shortUrl} for ${url}`);
    // return res.redirect(url);
    return res.json({ longUrl: url });
  } catch (e) {
    logger.error(`Url "${shortUrl}" (decoded id: ${id}) not found.`);
    // TODO: This should redirect to the homepage and show an error message
    // Something like this..
    // return res.redirect("https://sh.diogocardoso.me/?error=NOT_FOUND");
    return res.sendStatus(404);
  }
};

const saveUrl = async (req: Request, res: Response) => {
  let longUrl = _.get(req.body, "longUrl");
  if (!_.isString(longUrl) || !isURL(longUrl)) {
    return res
      .status(400)
      .json({ error: "Url is undefined or not formatted properly." });
  }
  if (!isURL(longUrl, { require_protocol: true })) {
    // This means that the url is valid but doesn't have the protocol (http/https)
    // We assume that the url has https enabled, since its 2019
    longUrl = `https://${longUrl}`;
  }
  const url = new Url({ url: longUrl });
  try {
    const { _id } = await url.save();
    const shortUrl = encode(_id);
    logger.info(`Created new shortUrl "${shortUrl}" for "${longUrl}"`);
    return res.status(201).json({ shortUrl });
  } catch (e) {
    logger.error(`Error creating shortUrl for "${longUrl}"`);
    return res.status(500).json({ error: "Error creating the short url." });
  }
};

const getStats = async (req: Request, res: Response) => {
  try {
    const numUrls = await Url.estimatedDocumentCount();
    return res.json({ numUrls });
  } catch (error) {
    return res.status(400);
  }
};

export { getUrl, saveUrl, getStats };
