import './App.css';
import {Routes,Route} from 'react-router-dom';
import {Home,Reminder,Bin,Archive} from './pages';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';

function App(){
  const [notes, setNotes] = useState([]);
  // const [notesTrial, setNotesTrial] = useState([]);
  // const [pageCount, setPageCount] = useState(0);
  const fetchNotesFunction = async ()=>{
  let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getNotes`);
  let fetchedNotesResponse = await fetchedNotesReq?.json();
  let fetchedNotes = fetchedNotesResponse?.notes;
  // let notesToShow = [];
  // for (let i = pageCount; i < pageCount+6; i++) {
  //   notesToShow.push(fetchedNotes[i]);
  // }
  setNotes(fetchedNotes)
  // setNotesTrial(notesToShow)
};

// console.log(notesTrial)
useEffect(() => {
  fetchNotesFunction();
}, [])
  return (
    <div className="App">
        <Navbar />
      <Routes>
        <Route exact path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route exact path="/bin" element={<Bin />} />
        <Route exact path="/archive" element={<Archive />} />
        <Route exact path="/reminder" element={<Reminder />} />
      </Routes>
    </div>
  );
}

export default App;
