import express from "express";
import authRouter from "../Controller/Admin/AdminAuthController.js";
import userAuthRouter from "../Controller/User/UserAuthController.js";
import projectRouter from "./projectRoutes.js";
import userprojectRouter from "./UserRoutes/UserRoutes.js";
import registeredAdminUsersRouter from "./RegisteredAdminUsersRoutes.js";
import multer from "multer";
import uploadImageToS3 from "../utilities/documents.js";
import proxpertyUsersRouter from "./ProxpertyUsersRoutes.js";
import builderRouter from "./BuilderRoutes.js";
// import countryRouter from "./CountryRoutes.js";
import typeRouter from "./TypeRoutes.js";
import locationRoutes from "./LocationRoutes.js";
// Add JSON body parser middleware
// router.use(express.json());

const router = express.Router();
const upload = multer({ dest: "uploads/" })

router.use("/admin_auth", authRouter);

router.use("/user_auth", userAuthRouter)

router.use("/admin/project", projectRouter) // to create the project or its operations
router.use("/user/project", userprojectRouter) // to create the project or its operations
// router.use("/admin/user", userRouter)
// router.use("/admin/admin-users", adminUsersRouter)
router.use("/admin/registered_admin_users", registeredAdminUsersRouter) // to get the admin registerd users
router.use("/admin/proxperty_users", proxpertyUsersRouter) // to get the proxperty registerd users
router.use("/admin/builder", builderRouter) // to get the builder registerd users
// router.use("/admin/country", countryRouter) // to get the country registerd users
router.use("/admin/type", typeRouter) // to get the type registerd users    // Add new route for image upload
router.use("/admin/location", locationRoutes);
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