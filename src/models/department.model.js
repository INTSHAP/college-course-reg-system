const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    faculty: {
      type: mongoose.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    // courses: {
    //   type: [mongoose.Types.ObjectId],
    //   ref: 'Course',
    //   default: [],
    // },
  },
  { timestamps: true }
);

// delete associated courses when a department is deleted
departmentSchema.pre('remove', async function () {
  await this.model('Course').deleteMany({ faculty: this._id });
});

departmentSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'department',
  justOne: false,
});

const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
module.exports = Department;
