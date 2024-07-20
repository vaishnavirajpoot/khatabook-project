const express = require("express");
const router = express.Router();

const {createHisaabControllers,postcreateHisaabControllers,hisaabpageControllers,readVerifyHisaabControllers,
    deleteHisaabControllers,editHisaabControllers,editPostHisaabControllers
 } = require("../controllers/hisaabControllers");

const {isLoggedIn,redirectIfLoggedIn} = require("../middlewares/auth-middlewares")

router.get("/create",isLoggedIn,createHisaabControllers);
router.post("/create",isLoggedIn,postcreateHisaabControllers);

router.get("/view/:id",isLoggedIn,hisaabpageControllers);

router.post("/verify/:id",isLoggedIn,readVerifyHisaabControllers)

router.get("/delete/:id",isLoggedIn,deleteHisaabControllers)
router.get("/edit/:id",isLoggedIn,editHisaabControllers)

router.post("/edit/:id",isLoggedIn,editPostHisaabControllers)










module.exports = router;


