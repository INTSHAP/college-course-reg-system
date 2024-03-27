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

// ensure student does not register a course twice or more
courseRegistrationSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.models.CourseRegistration || mongoose.model('CourseRegistration', courseRegistrationSchema);
