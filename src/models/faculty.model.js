const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    departments: {
      type: [mongoose.Types.ObjectId],
      ref: 'Department',
      default: [],
    },
  },
  { timestamps: true }
);

// delete associated departments when a faculty is deleted
facultySchema.pre('remove', async function () {
  await this.model('Department').deleteMany({ faculty: this._id });
});

module.exports = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);
