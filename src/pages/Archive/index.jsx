import React from 'react'
import Cards from '../../components/Cards';
import './index.css'

const Archive = ({notes,setNotes,changeLayout}) => {
  let archivedNotes = [];
  for (let i = 0; i < notes.length; i++) {
      if (notes[i].status === "archived") {
        archivedNotes.push(notes[i]);
      }  
  }
  return (
    <div className='archive-container'>
    <div className="archive-content">
        <Cards notes={archivedNotes} setNotes={setNotes} notesHeading={'archived:'} changeLayout={changeLayout} />
    </div>
  </div>
  )
}

export default Archive