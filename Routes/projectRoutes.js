import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  bhk_insert,
  bhk_view,
  bhk_edit,
  bhk_update,
  bhk_delete,
  highlightPoint,
  highlightPoint_view,
  highlightedit,
  highlightupdate,
  highlightdelete,
  connectivityPoint,
  connectivityPoint_view,
  connectivityedit,
  connectivityupdate,
  connectivitydelete,
  getProjectByUrl,
  getProjectByCity,
  getProjectByBuilder,
  rera_insert,
  rera_view,
  rera_edit,
  rera_update,
  rera_delete,
} from "../Controller/Admin/Project/ProjectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

router.post("/bhk_insert/:id", bhk_insert);
router.get("/bhk_view/:id", bhk_view);
router.get("/bhk_edit/:id", bhk_edit);
router.put("/bhk_update/:id", bhk_update);
router.delete("/bhk_delete/:id", bhk_delete);

router.post("/rera_insert/:id", rera_insert);
router.get("/rera_view/:id", rera_view);
router.get("/rera_edit/:id", rera_edit);
router.put("/rera_update/:id", rera_update);
router.post("/rera_delete/:id", rera_delete);


router.post("/highlight/:id", highlightPoint);
router.get("/highlight/view/:id", highlightPoint_view);
router.get("/highlight/edit/:id", highlightedit);
router.post("/highlight/update/:id", highlightupdate);
router.delete("/highlight/delete/:id", highlightdelete);

router.post("/connectivity/:id", connectivityPoint);
router.get("/connectivity/view/:id", connectivityPoint_view);
router.get("/connectivity/edit/:id", connectivityedit);
router.post("/connectivity/update/:id", connectivityupdate);
router.delete("/connectivity/delete/:id", connectivitydelete);

router.get("/project/:project_url", getProjectByUrl);
router.get("/city/:city", getProjectByCity);
router.get("/builder/:builderName", getProjectByBuilder);

export default router;
