import express from "express";
import authRouter from "../Controller/Admin/AdminAuthController.js";
import userAuthRouter from "../Controller/User/UserAuthController.js";
import projectRouter from "./projectRoutes.js";
import registeredAdminUsersRouter from "./RegisteredAdminUsersRoutes.js";
import multer from "multer";
import uploadImageToS3 from "../utilities/documents.js";
import proxpertyUsersRouter from "./ProxpertyUsersRoutes.js";
// Add JSON body parser middleware
// router.use(express.json());

const router = express.Router();
const upload = multer({ dest: "uploads/" })

router.use("/admin_auth", authRouter);

router.use("/user_auth", userAuthRouter)

router.use("/admin/project", projectRouter) // to create the project or its operations
// router.use("/admin/user", userRouter)
// router.use("/admin/admin-users", adminUsersRouter)
router.use("/admin/registered_admin_users", registeredAdminUsersRouter) // to get the admin registerd users
router.use("/admin/proxperty_users", proxpertyUsersRouter) // to get the proxperty registerd users
// Add new route for image upload
router.post("/upload-image", upload.single('image'), uploadImageToS3);

// Test endpoint
router.get("/test-register", (req, res) => {
    res.json({
        message: "Test registration endpoint",
        example_request: {
            method: "POST",
            url: "/register",
            body: {
                name: "Test User",
                email: "test@example.com",
                password: "test123"
            }
        }
    });
});

router.post('/upload_image',upload.single("image"),uploadImageToS3)

router.get("/", (req, res) => {
    res.send("Hello World!");
});


router.get("/about", (req, res) => {
    res.send("About Page");
});

export default router;