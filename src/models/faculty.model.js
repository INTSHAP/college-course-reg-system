const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// delete associated departments when a faculty is deleted
facultySchema.pre('remove', async function () {
  await this.model('Department').deleteMany({ faculty: this._id });
});

facultySchema.virtual('departments', {
  ref: 'Department',
  localField: '_id',
  foreignField: 'faculty',
  justOne: false,
});

facultySchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'faculty',
  justOne: false,
});

module.exports = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);
