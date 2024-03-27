const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: {
        values: ['science', 'social sciences', 'arts', 'engineering', 'agricultural science', 'law'],
        message: '{VALUE} is not a valid faculty name',
      },
    },
    departments: {
      type: [String],
      default: [],
      unique: [true, 'Department most be unique'],
    },
  },
  { timestamps: true }
);

// delete associated courses when a faculty is deleted
facultySchema.pre('remove', async function () {
  await this.model('Course').deleteMany({ faculty: this._id });
});

module.exports = mongoose.models.Faculty || mongoose.model('Faculty', facultySchema);
