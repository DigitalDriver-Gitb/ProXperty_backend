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
  highlightdelete
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
router.post("/highlight/:id", highlightPoint);
router.get("/highlight/view/:id", highlightPoint_view);
router.get("/highlight/edit/:id", highlightedit);
router.post("/highlight/update/:id", highlightupdate);
router.delete("/highlight/delete/:id", highlightdelete);

export default router;
