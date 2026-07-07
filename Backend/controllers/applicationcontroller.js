const Application = require("../models/Application");
const Job = require("../models/Job");

const applyjob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;

    if (!userId || !jobId) {
      return res
        .status(400)
        .json({ message: "User ID and Job ID are required" });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const newapplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newapplication._id);
    await job.save();

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: newapplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getApppliedjobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          select: "companyName",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({ message: "No applications found" });
    }

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log(error);
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: [
        {
          path: "applicant",
          select: "name email phone profile.resume profile.resumeOriginalName",
        },
        { path: "job", select: "title" },
      ],
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({ message: "Status not available" });
    }

    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { applyjob, getApppliedjobs, getApplicants, updateStatus };
