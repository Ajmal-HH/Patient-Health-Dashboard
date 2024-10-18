import { useState } from 'react';
import bgImage from '../assets/addpatient.jpg';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';




function AddNewPatient() {
    const [patientName, setPatientName] = useState('')
    const [patientAge, setPatientAge] = useState('')
    const [patientMobile, setPatientMobile] = useState('')
    const [patientPlace, setPatientPlace] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const patientDataValidationSchema = Yup.object({
      patientName: Yup.string()
      .matches(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/, 'Please enter a name containing only alphabetic characters.')
      .trim()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),  
      patientMobile: Yup.string()     
          .matches(/^\d{10}$/, "Mobile number must be 10 digits")
          .required('Mobile number is required'),
          patientPlace: Yup.string()
          .matches(/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/, 'Please enter a name containing only alphabetic characters.')
          .trim()
          .required('Place is required')
          .min(3, 'Place must be at least 3 characters'),
          patientAge: Yup.string()
          .trim()
          .required('Age is required')
  });

    const token = localStorage.getItem("token");



    const handleSubmit = async (e) =>{
      if (!token) {
        toast.error('Please Login');
        navigate('/login');
        return;
    }
        e.preventDefault()
        try {
          await patientDataValidationSchema.validate({ patientName,patientPlace,patientMobile,patientAge }, { abortEarly: false })

            axios.post('http://localhost:5001/addpatient',{patientName,patientPlace,patientMobile,patientAge})
            .then(() => {
                setPatientAge('')
                setPatientMobile('')
                setPatientName('')
                setPatientPlace('')
                toast.success('New Patient Added')
              })
              .catch((err) => {
                console.log(err.response.data.message);
                if (err.response && err.response.data && err.response.data.message) {
                  toast.error(err.response.data.message);
                } else {
                  toast.error('An error occurred. Please try again later.');
                }
              })
        } catch (error) {
          const newErrors = {}

          error.inner.forEach((err) => {
            newErrors[err.path] = err.message
          })
          setErrors(newErrors)        }

    }

  return (
    <div
      className='min-h-screen bg-cover bg-center flex items-center'
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="max-w-md w-full mx-auto p-8 rounded-lg shadow-lg bg-white bg-opacity-30 backdrop-blur-md border border-white/30">
        <div className='text-2xl mb-5 text-white font-bold'>
        <p className='mb-5' onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: 'blue' }}>
      &larr; Back
    </p>           
     <h1>ADD NEW PATIENT</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={patientName}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              onChange={(e)=>setPatientName(e.target.value)}
            />

            <label 
              htmlFor="name" 
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Patient Name
            </label>
            {errors.patientName && <div className='text-red-600'>{errors.patientName}</div>}

          </div>

          {/* Age Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="number" 
              name="age" 
              id="age" 

              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              value={patientAge}
              onChange={(e)=>setPatientAge(e.target.value)}
            />
            <label 
              htmlFor="age" 
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age
            </label>
            {errors.patientAge && <div className='text-red-600'>{errors.patientAge}</div>}

          </div>

          {/* Mobile Number Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              name="mobile" 
              id="mobile" 
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              value={patientMobile}
              onChange={(e)=>setPatientMobile(e.target.value)}
            />
            <label 
              htmlFor="mobile" 
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mobile Number
            </label>
            {errors.patientMobile && <div className='text-red-600'>{errors.patientMobile}</div>}

          </div>

          {/* Place Input */}
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              name="place" 
              id="place" 
              value={patientPlace}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              onChange={(e)=>setPatientPlace(e.target.value)}
            />
            <label 
              htmlFor="place" 
              className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Place
            </label>
            {errors.patientPlace && <div className='text-red-600'>{errors.patientPlace}</div>}

          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewPatient;
