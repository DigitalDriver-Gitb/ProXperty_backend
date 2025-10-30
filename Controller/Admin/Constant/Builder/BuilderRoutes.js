import express from "express";
import {
  createBuilder,
  getBuilders,
  getBuilder,
  updateBuilder,
  deleteBuilder,
} from "./AddBuilder.js";

const BuilderRouter = express.Router();

BuilderRouter.post("/", createBuilder);
BuilderRouter.get("/", getBuilders);
BuilderRouter.get("/:id", getBuilder);
BuilderRouter.put("/:id", updateBuilder);
BuilderRouter.delete("/:id", deleteBuilder);

export default BuilderRouter;
