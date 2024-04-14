const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creditUnit: {
      type: Number,
      required: true,
      default: 2,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['C', 'E'],
      }, // "C" for compulsory and "E" for elective
    },
    fee: {
      type: Number,
      required: true,
      min: [0, 'Invalid course fee'],
    },
    faculty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: 'Department',
      required: true,
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
courseSchema.index({ title: 1, code: 1 }, { unique: true });
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
