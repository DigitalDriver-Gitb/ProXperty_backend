import express from "express";
import {
  createType,
  getTypes,
  getType,
  updateType,
  deleteType,
} from "../Controller/Admin/Constant/AddTypeController.js";

const TypeRouter = express.Router();

TypeRouter.post("/", createType);
TypeRouter.get("/", getTypes);
TypeRouter.get("/:id", getType);
TypeRouter.put("/:id", updateType);
TypeRouter.delete("/:id", deleteType);

export default TypeRouter;
