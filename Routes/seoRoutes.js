import express from "express";
import {
  getCityPage,
  getCityBhkPage,
  getProjectPage,
  getBuilderPage,
  getCityBhkFilterPage,
  getCityLocationBhkFilterPage,
  getCityLocationBhkPage,
  getCityLocationPage,
  getCityTypePage,
  getCityTypeLocationPage,
  getCityTypeLocationBhkPage,
  getCityTypeLocationBhkFilterPage,
  getCityTypeLocationSublocationPage,
  getCityTypeLocationSublocationBhkPage,
  getFullFilterPage,
} from "../Controller/SEO/seoController.js";

const seoRouter = express.Router();

// 🔥 SEO routes
seoRouter.get("/:city", getCityPage);
seoRouter.get("/:city/:bhk", getCityBhkPage);
seoRouter.get("/project/:slug", getProjectPage);
seoRouter.get("/builder/:builder", getBuilderPage);
seoRouter.get("/:city/:bhk/:filter", getCityBhkFilterPage);
seoRouter.get("/:city/:location", getCityLocationPage);
seoRouter.get("/:city/:location/:bhk", getCityLocationBhkPage);
seoRouter.get("/:city/:location/:bhk/:filter", getCityLocationBhkFilterPage);
seoRouter.get("/:city/:type", getCityTypePage);
seoRouter.get("/:city/:type/:location", getCityTypeLocationPage);
seoRouter.get("/:city/:type/:location/:bhk", getCityTypeLocationBhkPage);
seoRouter.get("/:city/:type/:location/:bhk/:filter", getCityTypeLocationBhkFilterPage);
seoRouter.get("/:city/:type/:location/:sublocation", getCityTypeLocationSublocationPage);

seoRouter.get("/:city/:type/:location/:sublocation/:bhk", getCityTypeLocationSublocationBhkPage);

seoRouter.get("/:city/:type/:location/:sublocation/:bhk/:filter", getFullFilterPage);

export default seoRouter;