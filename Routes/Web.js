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
import advertiseWithUsRouter from "./UserRoutes/AdvertiseWithUsRoutes.js";
import sellRentRouter from "./UserRoutes/SellRentRoutes.js";
import projectEnquireRouter from "./UserRoutes/ProjectEnquire.js";
    // Add JSON body parser middleware
// router.use(express.json());

const router = express.Router();
const upload = multer({ dest: "uploads/" })

router.use("/admin_auth", authRouter);

router.use("/user_auth", userAuthRouter);

router.use("/admin/project", projectRouter);
router.use("/admin/registered_admin_users", registeredAdminUsersRouter);
router.use("/admin/proxperty_users", proxpertyUsersRouter);
router.use("/admin/builder", builderRouter);
router.use("/admin/type", typeRouter);
router.use("/admin/location", locationRoutes);


router.use("/user/project", userprojectRouter);
router.use("/user/enquiry/advertise_with_us",advertiseWithUsRouter);
router.use("/user/enquiry/sell_rent",sellRentRouter);
router.use("/user/enquiry/project",projectEnquireRouter);
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