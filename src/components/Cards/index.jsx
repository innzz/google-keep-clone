import React, { useEffect, useState } from 'react';
import InputCard from '../InputCard';
import './index.css';

const Cards = ({notes,setNotes,notesHeading,trashNotesSate,setTrashNotes}) => {
  return (
    <div className="cards-container" >
      <h1>{notes?.length > 0 && notesHeading}</h1>
      <div  className="cards-section">
        {notes?.reverse().map((note,i)=>{
          return (
            <InputCard key={i} title={note?.title} trashNotesSate={trashNotesSate} setTrashNotes={setTrashNotes} message={note?.message} setNotes={setNotes} singleNote={note} noteStatus={note.status}/>
          )
        })}
      </div>
    </div>
  )
}

export default Cards