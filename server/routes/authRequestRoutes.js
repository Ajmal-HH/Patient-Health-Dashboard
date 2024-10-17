const express = require('express');
const AuthorizationRequest = require('../models/AuthorizationRequest');

const router = express.Router();

// Get all authorization requests
router.get('/', async (req, res) => {
  try {
    const requests = await AuthorizationRequest.find().populate('patientId');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new authorization request
router.post('/', async (req, res) => {
  const { patientId, treatmentType, insurancePlan, dateOfService, diagnosisCode, doctorNotes } = req.body;
  const request = new AuthorizationRequest({ patientId, treatmentType, insurancePlan, dateOfService, diagnosisCode, doctorNotes });
  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
