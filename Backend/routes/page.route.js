import { Router } from "express";
import { getHomePage, getAboutPage } from "../controllers/page.controller.js";

const router = Router();

router.get("/", getHomePage);
router.get("/about", getAboutPage);

export default router;

// Page routes
