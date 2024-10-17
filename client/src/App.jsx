import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientList from './components/PatientList';
import AddNewPatient from './components/AddNewPatient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientDetails from './components/PatientDetails';
import AddNotes from './components/AddNotes';
import Login from './components/Login';



const App = () => {
  return (
    <div>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patientlist" element={<PatientList />} />
        <Route path="/addnewpatient" element={<AddNewPatient />} />
        <Route path="/patientDetails" element={<PatientDetails />} />
        <Route path='/addnote' element={<AddNotes />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
