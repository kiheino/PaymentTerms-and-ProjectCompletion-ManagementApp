const Client = require("../models/client");

exports.registerClient = async (req, res) => {
  try {
    //顧客登録
    const client = await Client.create(req.body);
    console.log("登録に成功しました");
    console.log(client);
    return res.status(200).json(client);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getClient = async (req, res) => {
  const { clientName } = req.params;
  try {
    const client = await Client.findOne({ clientName: clientName });
    if (!client) return res.status(404).json("顧客が存在しません");
    return res.status(200).json(client);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const clients = await Client.find({});
    return res.status(200).json(clients);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
