const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  //パスワードの受取
  const password = req.body.password;
  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
    //userの新規作成
    const user = await User.create(req.body);
    //JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRETKEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//ログイン用controller

exports.login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    //DBにユーザーがぞんざいするか確認
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            path: "userId",
            msg: "ユーザー名が無効です",
          },
        ],
      });
    }
    //パスワード照合
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            path: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    //JWTを発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRETKEY, {
      expiresIn: "24h",
    });

    return res.status(201).json({ user, token });
  } catch (err) {
    //DBが正常に動作しないとき
    return res.status(500).json(err);
  }
};
