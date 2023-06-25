const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/client", require("./client"));
router.use("/project", require("./project"));
router.use("/invoice", require("./invoice"));

module.exports = router;
