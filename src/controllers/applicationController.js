const Application = require('../models/Application');
const catchAsync = require('../utils/catchAsync');

exports.createApplication = catchAsync(async (req, res) => {
  // Add candidate from logged in user
  req.body.candidate = req.user.id;
  
  const application = await Application.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { application }
  });
});

exports.getMyApplications = catchAsync(async (req, res) => {
  const applications = await Application.find({ candidate: req.user.id })
    .populate('job');

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: { applications }
  });
});

exports.getAllApplications = catchAsync(async (req, res) => {
  const applications = await Application.find()
    .populate('job')
    .populate('candidate');

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: { applications }
  });
});

exports.updateApplicationStatus = catchAsync(async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.status(200).json({
    status: 'success',
    data: { application }
  });
});
