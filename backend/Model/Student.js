const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema({
  amount: Number,
  status: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const studentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  className: String,
  board: String,
  gender: String,
  contact: String,
  address: String,
  image: String,
  

  // FEES SECTION 
  totalFees: {
    type: Number,
    default: 0
  },

  paidFees: {
    type: Number,
    default: 0
  },

  remainingFees: {
    type: Number,
    default: 0
  },

  installmentPlan: {
    type: Number,
    default: 2
  },

  installments: [installmentSchema],

},
 { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);