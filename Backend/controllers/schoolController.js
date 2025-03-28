import { addSchool, listSchools } from "../models/School.js";
import { validateSchool } from "../utils/validation.js";

export const createSchool = async (req, res) => {
  try {
    const { error } = validateSchool(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, address, latitude, longitude } = req.body;
    const schoolID = await addSchool(name, address, latitude, longitude);

    res.status(201).json({
      success: true,
      message: "School added Successfully",
      schoolID: schoolID,
    });
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Both latitude and Longitude are required",
      });
    }
    const userLat = parseFloat(latitude);
    const userLong = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLong)) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude",
      });
    }

    const schools = await listSchools(userLat, userLong);
    res.status(200).json({
      success: true,
      count: schools.length,
      schools: schools,
    });
  } catch (error) {
    console.error("Error listing schools:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
