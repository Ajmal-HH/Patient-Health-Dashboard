import  { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';



function PatientList() {
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  useEffect(()=>{
    fetchPatients()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

      //pagination
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10); // Items per page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const records = patients.slice(indexOfFirstItem, indexOfLastItem);
      // Change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const fetchPatients = () =>{
    if (!token) {
      toast.error('Please Login');
      navigate('/login');
      return;
  }
    axios.get(`https://patient-health-dashboard-psi.vercel.app/patients`)
    .then(response => {
        setPatients(response.data);
    })
    .catch(error => {
        console.error('Error fetching bike details:', error);
        toast.error('An error occurred, please try again later.');
    });
  }



  return (
    <div>
      <h1 className='font-medium text-2xl flex justify-center mt-5'>PATIENTS LIST</h1>
      <div>
        <div className=" relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
            </div>
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                value={search}
                 onChange={(e) => setSearch(e.target.value)}
                className="mr-5 block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for patient"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">Patient Name</th>
                <th scope="col" className="px-6 py-3">Age</th>
                <th scope="col" className="px-6 py-3">Place</th>
                <th scope="col" className="px-6 py-3">Mobile</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.filter((item) => {
                    return search.toLowerCase() === ''
                        ? item
                        : item.patientName.toLowerCase().includes(search.toLowerCase());
                }).map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900">{item.patientName}</th>
                  <td className="px-6 py-4">{item.patientAge}</td>
                  <td className="px-6 py-4">{item.patientPlace}</td>
                  <td className="px-6 py-4">{item.patientMobile}</td>
                  <td className="px-6 py-4">
                    <Link to={`/patientDetails?patientId=${item._id}`} className="font-medium text-blue-600 hover:underline">More</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={patients.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
      </div>
    </div>
  );
}

export default PatientList;
