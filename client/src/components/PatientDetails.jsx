import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PatientDetails() {
    const navigate = useNavigate();
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patientId');
    const [patient, setPatient] = useState({})
    const token = localStorage.getItem("token");


    useEffect(() => {
        if (!token) {
            toast.error('Please Login');
            navigate('/login');
            return;
        }
        axios.get(`http://localhost:5001/patient-details?patientId=${patientId}`)
            .then((response) => {
                const data = response.data;
                setPatient(data);
            })
            .catch((error) => {
                console.log('Error fetching bike details:', error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientId]);


    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <section className="mb-2 border bg-neutral-100 p-4 rounded-lg min-h-72 min-w-[400px]">
                <div className="mx-auto">
                    <div className="card md:flex max-w-lg">
                        <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                            <img
                                className="object-cover rounded-full"
                                src="https://tailwindflex.com/public/images/user.png"
                                alt="User Avatar" // Added alt text for accessibility
                            />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <p className="font-bold">{patient.patientName}</p>
                            <p>{patient.patientAge}</p>
                            <p>{patient.patientPlace}</p>
                            <p>{patient.patientMobile}</p>
                            {patient.doctornote && patient.doctornote.length > 0 ? (
                                patient.doctornote.map((note, index) => (
                                    <p key={index} className='mt-5'>{note}</p>
                                ))
                            ) : (
                                <p className='mt-5'>No doctor notes available</p>
                            )}

                            <div className='mt-5'>
                                <Link to={`/addnote?patientId=${patient._id}`} className=" bg-blue-500 hover:bg-blue-700 border px-3 py-1.5 rounded-lg text-sm">Add Note</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <p className='mb-5' onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: 'blue' }}>
                &larr; Back
            </p>
        </div>
    )
}

export default PatientDetails
