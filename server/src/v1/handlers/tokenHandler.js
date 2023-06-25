const User = require("../models/user");
const JWT = require("jsonwebtoken");

//クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  //   console.log(bearerHeader);
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    // console.log(bearer);
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRETKEY);
      //   console.log(decodedToken);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    //JWTと一致するユーザーを探す
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
