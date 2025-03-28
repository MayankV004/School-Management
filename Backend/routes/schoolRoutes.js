import express from "express";
import {createSchool , getSchools} from "../controllers/schoolController.js"
const router = express.Router();

router.post("/addSchool", createSchool);
router.get('/listSchools', getSchools);

export default router;