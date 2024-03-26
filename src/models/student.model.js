const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    faculty: {
      type: String,
      enum: {
        values: ['science', 'social sciences', 'arts', 'engineering', 'agricultural science', 'law'],
        message: '{VALUE} is not a valid faculty',
      },
      required: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      default: 100,
      required: true,
    },
    semester: {
      type: Number,
      default: 1,
      max: [3, 'Semester too large'],
      min: [1, 'Semester too small'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
