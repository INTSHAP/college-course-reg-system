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
    courses: {
      type: [mongoose.Types.ObjectId],
      ref: 'Course',
      default: [],
    },
  },
  { timestamps: true }
);

// delete associated courses when a department is deleted
departmentSchema.pre('remove', async function () {
  await this.model('Course').deleteMany({ faculty: this._id });
});

const Department = mongoose.models.Department || mongoose.model('Department', departmentSchema);
module.exports = Department;
