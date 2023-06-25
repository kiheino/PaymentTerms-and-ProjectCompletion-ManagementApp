const router = require("express").Router();
const projectController = require("../controllers/project");
const tokenHandler = require("../handlers/tokenHandler");

router.post(
  "/register",
  tokenHandler.verifyToken,
  projectController.registerProject
);

router.get(
  "/",
  tokenHandler.verifyToken,
  projectController.getUncompletedProjects
);
router.patch(
  "/update",
  tokenHandler.verifyToken,
  projectController.updateProject
);

router.delete("/:id", tokenHandler.verifyToken, projectController.delete);

module.exports = router;
