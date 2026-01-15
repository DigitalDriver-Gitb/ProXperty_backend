// routes/adminUsers.js
import express from "express";
// import auth from "../middleware/auth.js";
import {getRegisteredProxpertyUsers,deleteRegisteredProxpertyUser} from "../../Controller/User/ProxpertyUser/RegisterProxpertyUser.js";
const router = express.Router();

// Mount the controller routes
router.get('/', getRegisteredProxpertyUsers);
router.delete('/:id',deleteRegisteredProxpertyUser );

export default router;
