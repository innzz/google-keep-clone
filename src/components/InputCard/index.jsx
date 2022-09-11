import React, { useState } from 'react';
import './index.css';
import {BsPin,BsFillPinFill} from 'react-icons/bs';
import {MdOutlineArchive,MdAdd,MdDeleteOutline} from 'react-icons/md';
import { useEffect } from 'react';
import { useRef } from 'react';

const InputCard = ({showNotesInput,setShowNotesInput,title,message,setNotes,singleNote,noteStatus}) => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const ref = useRef(null);
  const [showEditableCard, setShowEditableCard] = useState(false);
  const [note, setNote] = useState({
    title: '',
    message: ''
  });

  const fetchNotesFunction = async ()=>{
    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getNotes`);
    let fetchedNotesResponse = await fetchedNotesReq.json();
    let fetchedNotes = fetchedNotesResponse?.notes;
    // let notesToShow = [];
    // for (let i = pageCount; i < pageCount+6; i++) {
    //   notesToShow.push(fetchedNotes[i]);
    // }
    // setNotes(notesToShow)
    setNotes(fetchedNotes)
    // return fetchedNotes
  }

  const deleteNotesFunction = async (noteItem)=>{
    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/deleteNotes`,
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

    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/updateNotesStatus`,
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
    const noteReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/addNotes`, {
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
    const noteReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/updateNotes`, {
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

    //This will calculate height of an element
    useEffect(() => {
      setHeight(ref.current.clientHeight)
      setWidth(ref.current.clientWidth)
    },[]);

    useEffect(() => {
      setWidth(width+300)
    },[ref]);

    console.log(height)
    console.log("width",width)
    
    // console.log(notes);
    // console.log(showEditableCard)

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
    // <div ref={ref} className={"notes-input-section"} onChange={()=>{setWidth(width+300); console.log("func called")}} style={{transform: `translate(${width+300}px,0px)`}}>
    <div ref={ref} className={"notes-input-section"} >
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