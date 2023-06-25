const mongoose = require("mongoose");
const { Schema } = mongoose;
const Client = require("./client");
const Invoice = require("./invoice");

const billingAmountSchema = new Schema({
  date: {
    type: Date,
  },
  amount: {
    type: Number,
  },
});

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },

  client: {
    type: Schema.Types.ObjectId,
    ref: Client,
  },

  contractAmount: {
    type: Number,
    required: true,
  },

  scheduledCompletionDate: {
    type: Date,
    required: true,
  },

  completionDate: {
    type: Date,
    required: false,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  billingAmount: [
    {
      type: billingAmountSchema,
      required: false,
    },
  ],

  invoiceId: [
    {
      type: Schema.Types.ObjectId,
      ref: Invoice,
      required: false,
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
