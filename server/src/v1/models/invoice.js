const mongoose = require("mongoose");
const { Schema } = mongoose;
const Client = require("./client");
const Project = require("./project");

const invoiceSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: Client,
  },

  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: Project,
    },
  ],

  invoiceDate: {
    type: Date,
    required: true,
  },

  dueDate: {
    type: Date,
    required: true,
  },

  totalAmount: {
    type: Number,
    required: false,
  },

  DateOfIssue: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
