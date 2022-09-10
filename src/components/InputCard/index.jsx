import React, { useState } from 'react';
import './index.css';
import {BsPin,BsFillPinFill} from 'react-icons/bs';
import {MdOutlineArchive,MdAdd,MdDeleteOutline} from 'react-icons/md';

const InputCard = ({showNotesInput,setShowNotesInput,title,message,setNotes,singleNote,noteStatus}) => {
  const [showEditableCard, setShowEditableCard] = useState(false);
  const [note, setNote] = useState({
    title: '',
    message: ''
  });

  const fetchNotesFunction = async ()=>{
    let fetchedNotesReq = await fetch('http://localhost:5000/api/getNotes');
    let fetchedNotesResponse = await fetchedNotesReq.json();
    let fetchedNotes = fetchedNotesResponse?.notes;
    setNotes(fetchedNotes)
    // return fetchedNotes
  }

  const deleteNotesFunction = async (noteItem)=>{
    console.log("func called")
    let fetchedNotesReq = await fetch('http://localhost:5000/api/deleteNotes',
    {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteItem),
    });
    let fetchedNotesResponse = await fetchedNotesReq.json();
    // console.log(fetchedNotesResponse);
    if (fetchedNotesResponse.status === "success") {
      fetchNotesFunction()
    }
  }

  const updateNotesStatusFunction = async (noteItem,status)=>{
    // console.log(noteItem)
    noteItem = {...noteItem, status: status};
    // console.log(noteItem)

    let fetchedNotesReq = await fetch('http://localhost:5000/api/updateNotesStatus',
    {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteItem),
    });
    let fetchedNotesResponse = await fetchedNotesReq.json();
    // console.log(fetchedNotesResponse);
    if (fetchedNotesResponse.status === "success") {
      fetchNotesFunction()
    }
  }

  //This function will set the value of inpits in a note variable
  const handleInputs = (e)=>{
    console.log("func called")
    if (e.target.name === 'title') {
      setNote({...note, title: e.target.value})
    }
    else{
      setNote({...note, message: e.target.value})
    }
  };

  

  //This function will add note to the data base
  const addNote = async(noteItem)=>{
    let data = noteItem
    const noteReq = await fetch('http://localhost:5000/api/addNotes', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const noteResponse = await noteReq.json();
    if (noteResponse.status === "success") {
      fetchNotesFunction();
      setNote({
        title: '',
        message: '',
      })
    }
    }

  const updateNote = async(noteItem,prevNote)=>{
    // console.log("function called", noteItem);
    prevNote = {...prevNote,title: noteItem.title,message: noteItem.message, status: "latest updates"}
    console.log(prevNote);
    const noteReq = await fetch('http://localhost:5000/api/updateNotes', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prevNote),
    })
    const noteResponse = await noteReq.json();
    if (noteResponse.status === "success") {
      fetchNotesFunction();
      setNote({
        title: '',
        message: '',
      })
    }
    }
    
    // console.log(notes);
    console.log(showEditableCard)

  return (
    <>
    {/* Editable Card */}
    {showEditableCard === true &&  showNotesInput === undefined ? 
      <div className="notes-input-section-editable-container">
        {/* <div className="notes-input-section" onClick={()=>setShowEditableCard(true)}> */}
        <div className="notes-input-section">
    <div className="notes-first-input-row">
      <input className='notes-title-input' name="title" type="text" placeholder='Title' rel="noreferrer" onChange={handleInputs} value={note.title} />
      <span className='notes-pin-icon-container'><BsPin className='notes-pin-icon' size={25} /></span>
    </div>
    <textarea rows="2" cols="50" name="message" className='notes-message-input' type="text" placeholder='Take a note...' onChange={handleInputs} value={note.message}  rel="noreferrer"/>
    <div className="notes-last-input-row">
    <div className="notes-input-options">
      <span className='notes-input-option-icon-container'><MdOutlineArchive size={20} className='notes-input-option-icon' /></span>
      <span className='notes-input-option-icon-container'><MdDeleteOutline onClick={()=>deleteNotesFunction(singleNote)}  size={20} className='notes-input-option-icon' /></span>
    </div>
    </div>
    <span className="notes-add-badge-button-container"><MdAdd className="notes-add-badge-button" size={25} /></span>
    <span className='notes-last-input-row-close-button' onClick={()=>{updateNote(note,singleNote)}}>update</span>
  </div>
    <span className='notes-last-input-row-close-button' onClick={()=>{setShowEditableCard(false);setNote({title: '',message: ''})}}>CLOSE</span>
      </div>
    :
    // Normal card
    <div className={"notes-input-section"}>
    {/* }}} onClick={()=>setShowEditableCard(true)}> */}
    {showNotesInput === true ? <div className="notes-first-input-row">
      <input className='notes-title-input' name="title" value={note.title} onChange={handleInputs} type="text" placeholder='Title' rel="noreferrer" />
      <span className='notes-pin-icon-container'><BsPin onClick={()=>setNote({...note,status: "pinned"})} className='notes-pin-icon' size={25} /></span>
    </div> : showNotesInput === undefined && <div className="notes-first-input-row" onClick={()=>setShowEditableCard(true)}>
      <h3 className='notes-title-input' >{title}</h3>
      <span className={noteStatus === "pinned" ? "notes-pinned-icon-container" : "notes-pin-icon-container"}>{noteStatus === "pinned" ? <BsFillPinFill style={{opacity: 1}} className='notes-pin-icon' size={25} onClick={()=>updateNotesStatusFunction(singleNote,"normal")}  /> :<BsPin className='notes-pin-icon' size={25} onClick={()=>updateNotesStatusFunction(singleNote,"pinned")} />}</span>
    </div> }
    {showNotesInput !== undefined ? <textarea name="message" value={note.message} onChange={handleInputs} onClick={()=>{if (showNotesInput === false) {
        setShowNotesInput(true)
    }}} rows="2" cols="50" className='notes-message-input' type="text" placeholder='Take a note...'  rel="noreferrer"/>: <p className='notes-message-input' onClick={()=>setShowEditableCard(true)}>{message}</p>}
    {showNotesInput === true ? <div className="notes-last-input-row">
    <div className="notes-input-options">
      <span className='notes-input-option-icon-container'><MdOutlineArchive size={20} className='notes-input-option-icon' /></span>
      <span className='notes-input-option-icon-container'><MdDeleteOutline  size={20} className='notes-input-option-icon' /></span>
    </div>
    <span className='notes-last-input-row-close-button' onClick={()=>{if (showNotesInput === true) {
        setShowNotesInput(false)
    }}}>CLOSE</span>
    </div>: showNotesInput === undefined && <div className="notes-last-input-row">
    <div className="notes-input-options">
      <span className='notes-input-option-icon-container'><MdOutlineArchive size={20} className='notes-input-option-icon' /></span>
      <span className='notes-input-option-icon-container'><MdDeleteOutline onClick={()=>deleteNotesFunction(singleNote)} size={20} className='notes-input-option-icon' /></span>
    </div>
    </div>}
    {showNotesInput !== undefined && <span className="notes-add-badge-button-container" onClick={()=>{addNote(note)}}><MdAdd className="notes-add-badge-button" size={25} /></span>}
  </div>}
    </>
  )
}

export default InputCard