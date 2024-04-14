const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Types.ObjectId,
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
    // courses: {
    //   type: [mongoose.Types.ObjectId],
    //   default: [],
    //   ref: 'Course',
    // },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

studentSchema.index({ user: 1, _id: 1, semester: 1, level: 1 }, { unique: true });
studentSchema.virtual('courses', {
  ref: 'CourseRegistration',
  localField: '_id',
  foreignField: 'student',
  justOne: false,
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
