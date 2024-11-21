const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: [true, 'Application must belong to a job']
  },
  candidate: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Application must belong to a candidate']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending'
  },
  coverLetter: {
    type: String
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate applications
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
