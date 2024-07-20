const express = require("express");
const router = express.Router();

const{landingPageControllers,
    registerControllers,
    postRegisterControllers,
    loginControllers,
    profileControllers,
    logoutControllers} = require("../controllers/indexControllers");

const {isLoggedIn,redirectIfLoggedIn} = require("../middlewares/auth-middlewares")

router.get("/", landingPageControllers);

router.get("/register",registerControllers);
router.post("/register",postRegisterControllers);
router.post("/login",loginControllers);
router.get("/logout",logoutControllers);
router.get("/profile",isLoggedIn,profileControllers);


module.exports = router;


