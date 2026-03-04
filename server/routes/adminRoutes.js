const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/dashboard", authenticate, authorize("admin"), adminController.getDashboard);
router.post("/eval", authenticate, authorize("admin"), adminController.runEval);
router.get("/check", adminController.checkAdmin);

module.exports = router;
