const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide job title'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please provide company name']
  },
  description: {
    type: String,
    required: [true, 'Please provide job description']
  },
  requirements: [{
    type: String
  }],
  location: {
    type: String,
    required: [true, 'Please provide job location']
  },
  salary: {
    type: String
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'internship'],
    default: 'full-time'
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema); 