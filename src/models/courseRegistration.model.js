const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema(
  {
    courses: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: 'Course',
    },
    student: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Stsameudent',
    },
    fee: {
      type: Number,
      required: true,
      min: [0, 'Invalid course registration fee'],
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

// ensure student does not register a course twice or more
courseRegistrationSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.models.CourseRegistration || mongoose.model('CourseRegistration', courseRegistrationSchema);
