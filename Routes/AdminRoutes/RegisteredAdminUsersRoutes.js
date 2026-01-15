// routes/adminUsers.js
import express from "express";
// import auth from "../../middleware/auth.js";
import { getRegisteredAdminUsers,deleteRegisteredAdminUser } from "../../Controller/Admin/users/RegisteredAdminUsersController.js";
const router = express.Router();

// Mount the controller routes
router.get('/', getRegisteredAdminUsers);
router.post('/delete/:id',deleteRegisteredAdminUser);

export default router;
