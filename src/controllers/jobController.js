const Job = require('../models/Job');
const catchAsync = require('../utils/catchAsync');

exports.getAllJobs = catchAsync(async (req, res) => {
  const jobs = await Job.find();
  
  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: { jobs }
  });
});

exports.getJob = catchAsync(async (req, res) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(200).json({
    status: 'success',
    data: { job }
  });
});

exports.createJob = catchAsync(async (req, res) => {
  const job = await Job.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { job }
  });
});

exports.updateJob = catchAsync(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(200).json({
    status: 'success',
    data: { job }
  });
});

exports.deleteJob = catchAsync(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
