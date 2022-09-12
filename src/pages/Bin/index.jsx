import React, { useEffect } from 'react'
import { useState } from 'react';
import Cards from '../../components/Cards'

const Bin = () => {
  const [trashNotes, setTrashNotes] = useState([]);
  const [trashNotesSate, setTrashNotesState] = useState(true);
  
  const fetchNotesFunction = async ()=>{
    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getTrashNotes`);
    let fetchedNotesResponse = await fetchedNotesReq?.json();
    let fetchedNotes = fetchedNotesResponse?.notes;
    setTrashNotes(fetchedNotes)
  };
  
  // console.log(notesTrial)
  useEffect(() => {
    fetchNotesFunction();
  }, [])
  return (
    <div className='bin-container'>
    <div className="bin-content">
        <Cards notes={trashNotes} notesHeading={'trash:'} trashNotesSate={trashNotesSate} setTrashNotes={setTrashNotes} />
    </div>
  </div>
  )
}

export default Bin