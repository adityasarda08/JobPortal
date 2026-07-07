const Company = require("../models/Company");
const cloudinary = require("../config/Cloud.js");
const getDataUri = require("../config/datauri.js");

const companyController = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;

    console.log(req.body);
    console.log(req.user);

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }

    const existingCompany = await Company.findOne({ companyName });

    if (existingCompany) {
      return res.status(200).json({
        success: true,
        message: "Company already exists",
        company: existingCompany,
      });
    }

    const newCompany = await Company.create({
      companyName,
      description,
      website,
      location,
      userId: [req.user._id],
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company: newCompany,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await Company.find({ userId: req.user._id });
    if (!companies) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ company ,success: true});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const file = req.file;

    const updateData = { companyName, description, website, location };

    if (file) {
      const fileuri = await getDataUri(file);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        fileuri.content,
      );
      updateData.logo = cloudinaryResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  companyController,
  getAllCompanies,
  getCompanyById,
  updateCompany,
};
