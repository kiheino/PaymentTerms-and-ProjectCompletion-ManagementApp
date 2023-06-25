const { body, validationResult } = require("express-validator");

const router = require("express").Router();

const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

//user新規登録API
router.post(
  "/register",
  body("userId")
    .isLength({ min: 6 })
    .withMessage("6文字以上のユーザーIDを入力してください"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("6文字以上のpasswordを入力してください"),
  body("confirmedPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("確認用passwordが一致しません"),
  body("userId").custom((value) => {
    return User.findOne({ userId: value }).then((user) => {
      if (user) {
        return Promise.reject("このuserIDはすでに使われています");
      }
    });
  }),
  validation.validate,
  userController.register
);

//ユーザーログイン用API
router.post(
  "/login",
  body("userId")
    .isLength({ min: 6 })
    .withMessage("6文字以上のusenameを入力してください"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("6文字以上のpasswordを入力してください"),
  validation.validate,
  userController.login
);

//JWT認証API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  req.user;
  return res.status(200).json({ user: req.user });
});

module.exports = router;
