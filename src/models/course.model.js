const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creditUnit: {
      type: Number,
      required: true,
      default: 2,
      max: [6, 'Credit unit should not be more than 6'],
      min: 1,
    },
    code: {
      type: String,
      required: true,
    },
    faculty: {
      type: mongoose.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
