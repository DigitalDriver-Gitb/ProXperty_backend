import express from "express";
import {
    getProjectByCity,
    getProjectByBuilder,
    getProjectById,
    getProjectByUrl,
    getProjects,
    getProjectBySpotlight,
    getSpotlightProjectByCities,
    getProjectByType,
    
} from "../../Controller/User/UserProject/UserProjectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/project/:project_url", getProjectByUrl);
router.get("/city/:city", getProjectByCity);
router.get("/builder/:builderName", getProjectByBuilder);
router.get("/spotlight", getProjectBySpotlight);
router.get("/spotlight/:city", getSpotlightProjectByCities);
router.get("/type/:city/:type", getProjectByType);


export default router;