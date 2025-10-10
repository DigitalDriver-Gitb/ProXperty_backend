// 

// import express from "express";
// import {
//   createProject,
//   getProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
// } from "../Controller/Admin/Project/ProjectController.js";

// const router = express.Router();

// router.post("/", createProject);       // Create
// router.get("/", getProjects);          // Read all
// router.get("/:id", getProjectById);    // Read one
// router.put("/:id", updateProject);     // Update
// router.delete("/:id", deleteProject);  // Delete

// export default router;


import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../Controller/Admin/Project/ProjectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
