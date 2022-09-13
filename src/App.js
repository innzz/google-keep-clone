import './App.css';
import {Routes,Route} from 'react-router-dom';
import {Home,Reminder,Bin,Archive} from './pages';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useState } from 'react';

function App(){
  const [notes, setNotes] = useState([]);
  

  const fetchNotesFunction = async ()=>{
  let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getNotes`);
  let fetchedNotesResponse = await fetchedNotesReq?.json();
  let fetchedNotes = fetchedNotesResponse?.notes;
  setNotes(fetchedNotes)
};

// console.log(notesTrial)
useEffect(() => {
  fetchNotesFunction();
}, [])
  return (
    <div className="App">
          <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      className="react-toast-container"
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
        <Navbar  />
      <Routes>
        <Route exact path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route exact path="/bin" element={<Bin />} />
        <Route exact path="/archive" element={<Archive notes={notes} setNotes={setNotes} />} />
      </Routes>
    </div>
  );
}

export default App;
