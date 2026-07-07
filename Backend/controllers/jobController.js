const Job = require("../models/Job");

// Create a new job
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      company,
      position,
      experience,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !company ||
      !position ||
      !experience
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newJob = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      location,
      salary: Number(salary),
      company,
      position,
      experience,
      jobType,
      CreatedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const { KeyWord, location, jobType } = req.query;
    let query = {};

    if (KeyWord) {
      query.$or = [
        { title: { $regex: KeyWord, $options: "i" } },
        { description: { $regex: KeyWord, $options: "i" } },
        { requirements: { $regex: KeyWord, $options: "i" } },
        { position: { $regex: KeyWord, $options: "i" } },
        {
          location: {
            $regex: KeyWord,
            $options: "i",
          },
        },
      ];
    }

    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("CreatedBy", "name email")
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "name email",
        },
      });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "Job found", job });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    if (job.CreatedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updatedjob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedjob,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    if (job.CreatedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    await Job.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//Admin jobs created
const getAdminJobs = async (req, res) => {
  try {
    const adminid = req.user._id;
    const jobs = await Job.find({
      CreatedBy: adminid,
    })
      .populate({
        path: "company",
        select: "companyName",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res
        .status(404)
        .json({ success: false, message: "No jobs found for this admin" });
    }
    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getAdminJobs,
};
