const router = require("express").Router();
const { addBillingController, billingListController,deleteBillingController, editBillingController } = require("../Controllers/billing.controller.js");
const VerifyToken = require("../VerifyToken/VerifyToken.js");

router.post("/api/add-billing",VerifyToken, addBillingController);
router.delete("/api/delete-billing/:id",VerifyToken, deleteBillingController);
router.get("/api/billing-list",VerifyToken, billingListController);
router.patch("/api/update-billing/:id",VerifyToken, editBillingController);

module.exports = router;