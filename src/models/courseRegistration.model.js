const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    student: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
    fee: {
      type: Number,
      required: true,
      min: [1000, 'Fee cannot be less 1000 Naira'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.CourseRegistration || mongoose.model('CourseRegistration', courseRegistrationSchema);
