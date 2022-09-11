import React, { useEffect, useState } from 'react';
import './index.css';
import Cards from '../../components/Cards';
import InputCard from '../../components/InputCard';

const Home = ({notes,setNotes}) => {
  const [showNotesInput, setShowNotesInput] = useState(false);
  
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
          <Cards notes={latestNotes} setNotes={setNotes} notesHeading={'latest updates:'} />
          <Cards notes={pinnedNotes} setNotes={setNotes} notesHeading={'pinned:'} />
          <Cards notes={normalNotes} setNotes={setNotes} notesHeading={'others:'} />
      </div>
    </div>
  )
}

export default Home