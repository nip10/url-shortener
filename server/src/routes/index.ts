import { Router } from "express";
import { getUrl, saveUrl, getStats } from "./../controllers";

const router: Router = Router();

router.get("/stats", getStats);
router.get("/:shortUrl", getUrl);
router.post("/", saveUrl);

export default router;
