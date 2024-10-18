import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg1.jpg';
import addPatient from '../assets/newpatient.jpg'
import patientList from '../assets/patientlist.jpg'
import { toast } from 'react-toastify';
import axios from 'axios';


const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()



  const handleLogout = () => {
    axios.get('http://localhost:5001/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem('token');
        toast.success('Logout successfully!');
        navigate('/');
      })  
      .catch((error) => {
        toast.error('Logout failed!');
        console.error(error);
      });
  };  return (
    <div
      className='min-h-screen bg-cover bg-center'
      style={{
        backgroundImage: `url(${bgImage})`,
        height: '100vh'
      }}
    >
      <div className='font-semibold flex justify-center'>
        <h1 className='mt-5 text-3xl'>PATIENT HEALTH DASHBOARD</h1>
      </div>
      <div className='flex items-end justify-between mr-16'>
        <div className='flex-grow'></div>
        {token ? <button onClick={handleLogout} className='ml-auto cursor-pointer bg-red-500 hover:bg-red-700  w-24 rounded-md h-10'>LOGOUT</button> : ''}
      </div>

      <div className='flex justify-center items-center m-10'>
        <div className='w-64 h-72 bg-white rounded-lg flex flex-col justify-center items-center shadow-md'>
          <div className='w-52 h-52 bg-green-300 rounded-lg mb-4 flex justify-center items-center'>
            <img src={addPatient} alt="" />
          </div>
          <Link to={'/addnewpatient'} className='bg-blue-500 flex items-center justify-center text-white w-52 h-12 rounded-lg hover:bg-blue-600 transition duration-200'>
            ADD NEW PATIENT
          </Link>
        </div>
        <div className='w-64 h-72 ml-5 bg-white rounded-lg flex flex-col justify-center items-center shadow-md'>
          <div className='w-52 h-52 bg-green-300 rounded-lg mb-4 flex justify-center items-center overflow-hidden'>
            <img
              src={patientList}
              alt="Patient List"
              className="object-cover w-full h-full"
            />
          </div>
          <Link to={'/patientlist'} className='bg-blue-500 flex items-center justify-center text-white w-52 h-12 rounded-lg hover:bg-blue-600 transition duration-200'>
            PATIENTS LIST
          </Link>
        </div>
      </div>




    </div>
  );
};

export default Dashboard;
