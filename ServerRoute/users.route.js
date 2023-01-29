const router = require("express").Router();
const VerifyToken = require("../JWT/JWtToken.js");
const { usersRegisterController, userLoginController, userPatchController, userGetController} = require("../Billing and user control/users.controller.js");
router.post("/api/registration", usersRegisterController)
router.patch("/register", userPatchController)
router.get("/register",VerifyToken, userGetController)
router.get("/api/login", userLoginController)

module.exports = router;