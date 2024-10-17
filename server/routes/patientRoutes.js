const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new patient
router.post('/addpatient', async (req, res) => {
  console.log('entered....')
console.log(req.body)
  // const { name, age, condition, medicalHistory, treatmentPlan } = req.body;
  const patient = new Patient({ name, age, condition, medicalHistory, treatmentPlan });
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
