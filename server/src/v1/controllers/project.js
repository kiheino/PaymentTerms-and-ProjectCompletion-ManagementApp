const Project = require("../models/project");
const Client = require("../models/client");

exports.registerProject = async (req, res) => {
  try {
    req.body.contractAmount = Number(
      req.body.contractAmount.replaceAll(",", "")
    );
    const clientName = req.body.client;
    const client = await Client.findOne({ clientName: clientName });
    console.log(client);
    const clientId = client._id;
    req.body.client = clientId;
    console.log(req.body);
    const project = await Project.create(req.body);
    return res.status(200).json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getUncompletedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isCompleted: false })
      .populate("client")
      .sort("scheduledCompletionDate");
    return res.status(201).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.updateProject = async (req, res) => {
  try {
    const id = req.body.id;
    await Project.findByIdAndUpdate(id, req.body);
    const updatedProject = await Project.findById(id);
    return res.status(200).json(updatedProject);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    console.log(project);
    return res.status(200).json("受注を削除しました");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
