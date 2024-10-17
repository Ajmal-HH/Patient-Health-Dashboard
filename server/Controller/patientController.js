import Patient from "../models/Patient.js";
import jwt from 'jsonwebtoken'

export const tokenBlacklist = new Set();



const accountLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const Hospital = {
        email : 'hospital@gmail.com',
        password : '112233'
      }
        
        // Check if user exists and password matches
        if (email === Hospital.email && password === Hospital.password) {
            // Generate a JWT token   
            console.log('entered..');
            
            const token = jwt.sign({ hospitalEmail: Hospital.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const logout = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];  
  if (token) {
      tokenBlacklist.add(token);
      res.status(200).json({ message: 'Logged out successfully' });
  } else {
      res.status(400).json({ message: 'No token provided' });
  }
}


const addPatient = async (req, res) => {
    const { patientName, patientPlace, patientMobile, patientAge } = req.body;

    if (!patientName || !patientPlace || !patientMobile || !patientAge) {
        return res.status(400).json({ status: false, message: 'All fields are required.' });
    }

    try {
        const patient = new Patient({
            patientName, 
            patientAge,
            patientPlace,
            patientMobile
        });

        const patientDetails = await patient.save();
        
        return res.status(201).json({ status: true, data: patientDetails });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ status: false, message: 'An error occurred, please try again.' });
    }
};


    const fetchPatients = async (req,res) =>{
        try {
            const patients = await Patient.find();
            res.status(200).json(patients);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: "Failed to fetch patients" });
        }
    }

    const patientDetails = async (req,res) =>{
        const patientId = req.query.patientId
        
        const patientDetails = await Patient.findById({_id : patientId})
        
        res.json(patientDetails)  
    }

    const addDoctorNote = async (req, res) => {
        try {
          const patientId = req.query.patientId;
          const {notes} = req.body;
      
          const date = new Date();
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
          const updatednote = formattedDate + ' ' + notes ;
          
          if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required." });
          }
          if (!notes) {
            return res.status(400).json({ message: "Doctor note is required." });
          }
      
          const patient = await Patient.findByIdAndUpdate(
            { _id: patientId },
            { $push: { doctornote: updatednote } }, 
            { new: true } 
          );
      
          if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
          }
      
 
          return res.status(200).json({ message: "Doctor note added successfully.", patient });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "An error occurred while adding the doctor note." });
        }
      };
      
export {
    addPatient,
    fetchPatients,
    patientDetails,
    addDoctorNote,
    accountLogin,
    logout
};
