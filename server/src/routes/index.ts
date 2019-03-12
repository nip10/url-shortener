import { Router } from "express";
import { getUrl, saveUrl } from "./../controllers";

const router: Router = Router();

router.get("/:shortUrl", getUrl);
router.post("/", saveUrl);

export default router;
