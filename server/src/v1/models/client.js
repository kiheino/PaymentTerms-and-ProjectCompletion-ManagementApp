const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  clientName: {
    type: String,
    required: true,
  },
  ruby: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  cutoffDate: {
    type: String,
    required: true,
  },
  paymentMonth: {
    type: String,
    required: true,
  },
  paymentDay: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Client", clientSchema);
