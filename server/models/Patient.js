import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientAge: {
    type: Number,
    required: true
  },
  patientPlace: {
    type: String,
    required: true
  },
  patientMobile: {
    type: Number,
    required: true
  },
  condition: {
    type: String
  },
  medicalHistory: {
    type: String
  },
  doctornote: {
    type: Array
  },
});


const Patient = mongoose.model('Patient',patientSchema)

export default Patient