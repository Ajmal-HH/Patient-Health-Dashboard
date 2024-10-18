import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddNotes() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patientId = searchParams.get("patientId");
  const [notes, setNotes] = useState("");
  const navigate =useNavigate()

  console.log(notes,"1212")

  const handleSubmit = () => {
    if (!patientId) {
      toast.error("Patient ID is missing.");
      return;
    }

    if (!notes.trim()) {
      toast.error("Please add some content to the note.");
      return;
    }

    axios
      .post(`https://patient-health-dashboard-psi.vercel.app/addnote?patientId=${patientId}`, { notes })
      .then(() => {
        toast.success("Note added");
        navigate(-1)
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="font-bold text-2xl">ADD NOTE</p>
      <textarea
        id="message"
        rows="4"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="block p-4 w-[500px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
      <button
        onClick={handleSubmit} 
        className="bg-blue-600 w-28 h-8 mt-2 rounded-md cursor-pointer text-white"
      >
        ADD NOTE
      </button>
    </div>
  );
}

export default AddNotes;
