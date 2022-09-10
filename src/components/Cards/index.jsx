import React, { useEffect, useState } from 'react';
import InputCard from '../InputCard';
import './index.css';

const Cards = ({notes,setNotes,notesHeading}) => {
  const [pageCount, setPageCount] = useState(0);
  // const [notesToShow, setNotesToShow] = useState(notes);
  // useEffect(() => {
  //   fetchNotesFunction();
  //   // nextPageData(pageCount,pageCount+6,notes)
  // }, [])
  // console.log(notes)
  // console.log(pageCount)
  
  // const nextPageData = (startDate, endDate, notesArray)=>{
  //   let notesInner = [];
  //   for (let i = startDate; i < endDate; i++) {
  //     if (notes[i] !== undefined) {
  //       notesInner.push(notesArray[i]);
  //       console.log(notesArray[i].status, notesArray[i].message);
  //     }
  //   }
  //   setPageCount(endDate);
  //   setNotesToShow(notesInner);

  // }
  return (
    <div className="cards-container" >
      <h1>{notes?.length > 0 && notesHeading}</h1>
      {/* <span onClick={()=>nextPageData(pageCount,pageCount+6,notes)}>+</span> */}
      <div className="cards-section">
        {notes?.reverse().map((note,i)=>{
          return (
            <InputCard key={i} title={note?.title} message={note?.message} setNotes={setNotes} singleNote={note} noteStatus={note.status}/>
          )
        })}
      </div>
    </div>
  )
}

export default Cards