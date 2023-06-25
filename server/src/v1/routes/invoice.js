const router = require("express").Router();
const invoiceController = require("../controllers/invoice");
const tokenHandler = require("../handlers/tokenHandler");

router.post(
  "/register/completion",
  tokenHandler.verifyToken,
  invoiceController.registerCompletion
);
router.post(
  "/register/progress",
  tokenHandler.verifyToken,
  invoiceController.registerProgressClaims
);

router.get("/", tokenHandler.verifyToken, invoiceController.getAll);
// router.delete("/:id", tokenHandler.verifyToken, projectController.delete);

module.exports = router;
