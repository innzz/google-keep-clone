import React, { useEffect, useState } from 'react';
import InputCard from '../InputCard';
import './index.css';

const Cards = ({notes,setNotes,notesHeading,trashNotesSate,setTrashNotes,changeLayout}) => {
  return (
    <div className="cards-container" >
      <h1>{notes?.length > 0 && notesHeading}</h1>
      <div  className="cards-section" style={{flexDirection : changeLayout === 'grid' ? 'row' : 'column'}}>
        {notes?.reverse().map((note,i)=>{
          return (
            <InputCard key={i} title={note?.title} trashNotesSate={trashNotesSate} setTrashNotes={setTrashNotes} message={note?.message} setNotes={setNotes} singleNote={note} noteStatus={note.status} changeLayout={changeLayout}/>
          )
        })}
      </div>
    </div>
  )
}

export default Cards