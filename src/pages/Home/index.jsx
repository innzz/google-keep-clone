import React, { useEffect, useState } from 'react';
import './index.css';
import Cards from '../../components/Cards';
import InputCard from '../../components/InputCard';

const Home = ({notes,setNotes,changeLayout}) => {
  const [showNotesInput, setShowNotesInput] = useState(false);

  const fetchNotesFunction = async ()=>{
    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getNotes`);
    let fetchedNotesResponse = await fetchedNotesReq?.json();
    let fetchedNotes = fetchedNotesResponse?.notes;
    setNotes(fetchedNotes)
  };
  
  useEffect(() => {
    fetchNotesFunction();
  }, [])
  
  let normalNotes = [];
  let pinnedNotes = [];
  let latestNotes = [];
  for (let i = 0; i < notes.length; i++) {
      if (notes[i].status === "normal") {
        normalNotes.push(notes[i]);
      }
      else if (notes[i].status === "pinned"){
        pinnedNotes.push(notes[i]);
      }
      else if (notes[i].status === "latest updates"){
        latestNotes.push(notes[i]);
      }
    
  }
  // console.log(notes);
  return (
    <div className='home-container'>
      <div className="home-content">
          <InputCard showNotesInput={showNotesInput} setShowNotesInput={setShowNotesInput} setNotes={setNotes} />
          <Cards notes={latestNotes} setNotes={setNotes} notesHeading={'latest updates:'} changeLayout={changeLayout} />
          <Cards notes={pinnedNotes} setNotes={setNotes} notesHeading={'pinned:'} changeLayout={changeLayout} />
          <Cards notes={normalNotes} setNotes={setNotes} notesHeading={'others:'} changeLayout={changeLayout} />
      </div>
    </div>
  )
}

export default Home