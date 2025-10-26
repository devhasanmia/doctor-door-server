import express from "express"
import { UserController } from "./user.controller";
import { upload } from "../../helpers/fileUploder";
const router = express.Router();


router.post(
    "/create-patient",
    (req, res, next) => {
        upload.single("profilePicture")(req, res, (err) => {
            if (err) {
                return next(err);
            }
            next();
        });
    },
    UserController.createPatient
);



export const UserRoutes = router;