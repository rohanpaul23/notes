import express from "express";

import {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote
} from "../controllers/notesController.js";

import { isAuthorised } from "../middleware/authenticationMiddleware.js";

const router = express.Router();

router.route("/").get(isAuthorised, getNotes);
router.route("/addNote").post(isAuthorised, addNote);
router
  .route("/:id")
  .get(getNoteById)
  .delete(isAuthorised, deleteNote)
  .put(isAuthorised, updateNote);

export default router;
