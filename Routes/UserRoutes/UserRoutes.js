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
    getProjectBySublocation,
    getAllBuilders,
    getBuildersByCity,
    getSpotlightProjectByBuilder    
} from "../../Controller/User/UserProject/UserProjectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/project/:project_url", getProjectByUrl);
router.get("/city/:city", getProjectByCity);
router.get("/sublocation/:sublocation", getProjectBySublocation);
router.get("/builder/:builderName", getProjectByBuilder);
router.get("/spotlight", getProjectBySpotlight);
router.get("/spotlight/:city", getSpotlightProjectByCities);
router.get("/type/:city/:type", getProjectByType);
router.get("/builders/:city", getBuildersByCity);
router.get("/builders", getAllBuilders);
router.get("/spotlightforbuilder/:builderName", getSpotlightProjectByBuilder);


export default router;