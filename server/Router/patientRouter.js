import express from 'express'
import { accountLogin, addDoctorNote, addPatient, fetchPatients, logout, patientDetails } from '../Controller/patientController.js'

const patient_router = express.Router()

patient_router.post('/login',accountLogin)
patient_router.get('/logout',logout)
patient_router.post('/addpatient',addPatient)
patient_router.get('/patients',fetchPatients)
patient_router.get('/patient-details',patientDetails)
patient_router.post('/addnote',addDoctorNote)

export default patient_router