const router = require("express").Router();
const clientController = require("../controllers/client");
const tokenHandler = require("../handlers/tokenHandler");

router.post(
  "/register",
  tokenHandler.verifyToken,
  clientController.registerClient
);
router.get(
  "/:clientName",
  tokenHandler.verifyToken,
  clientController.getClient
);

router.get("/", tokenHandler.verifyToken, clientController.getAll);

module.exports = router;
