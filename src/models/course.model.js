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
      type: String,
      enum: {
        values: ['science', 'social sciences', 'arts', 'engineering', 'agricultural science', 'law'],
        message: '{VALUE} is not a valid faculty name',
      },
    },
    department: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
