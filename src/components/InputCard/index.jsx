import React, { useState } from 'react';
import './index.css';
import {BsPin,BsFillPinFill} from 'react-icons/bs';
import {MdOutlineArchive,MdOutlineRestore,MdAdd,MdDeleteOutline} from 'react-icons/md';
import {IoMdArchive} from 'react-icons/io';
import { toast } from 'react-toastify';

const InputCard = ({showNotesInput,setShowNotesInput,title,message,setNotes,singleNote,noteStatus,trashNotesSate,setTrashNotes,changeLayout}) => {
  const [showEditableCard, setShowEditableCard] = useState(false);
  const [note, setNote] = useState({
    title: '',
    message: ''
  });


  //This will fetch all the notes
  const fetchNotesFunction = async ()=>{
    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getNotes`);
    let fetchedNotesResponse = await fetchedNotesReq.json();
    let fetchedNotes = fetchedNotesResponse?.notes;
    setNotes(fetchedNotes)
  }

  //This will fetch all the notes in trash
  const fetchTrashNotesFunction = async ()=>{
    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getTrashNotes`);
    let fetchedNotesResponse = await fetchedNotesReq.json();
    let fetchedNotes = fetchedNotesResponse?.notes;
    // let notesToShow = [];
    // for (let i = pageCount; i < pageCount+6; i++) {
    //   notesToShow.push(fetchedNotes[i]);
    // }
    // setNotes(notesToShow)
    setTrashNotes(fetchedNotes)
    // return fetchedNotes
  }

  //This will delete note and add it to trash
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
        toast.error('Moved to trash.', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      fetchNotesFunction()
    }
  }

  //This will permanently delete the note from trash
  const deletePermanentNotesFunction = async (noteItem)=>{
    let fetchedNotesReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/deletePermanentNotes`,
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
        toast.error('Permanently deleted!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        fetchTrashNotesFunction()
    }
  }

  //This will update the status of note
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
      toast.info(`You ${status} a note successfully`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
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
   if (noteItem.title !== "" || noteItem.message !== "") {
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
      toast.success('Your note has been added.', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      fetchNotesFunction();
      setNote({
        title: '',
        message: '',
      })
    }
   }
   else{
    toast.warning('Please write something!!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   }
    }

  //This function will restore notes from trash 
  const restoreNote = async(noteItem)=>{
    let data = {...noteItem,title: noteItem.title,message: noteItem.message,status: "normal"}
    const noteReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/restoreNotes`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const noteResponse = await noteReq.json();
    if (noteResponse.status === "success") {
      toast.success('Your note has been restored.', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        fetchTrashNotesFunction();
   }
    }
  
  //This function will update note
  const updateNote = async(noteItem,prevNote,status)=>{
    // console.log("function called", noteItem);
    if (noteItem.title !== "" || noteItem.message !== "") {
      prevNote = {...prevNote,title: noteItem.title,message: noteItem.message, status: `${status ? status: "latest updates"}`}
    const noteReq = await fetch(`${process.env.REACT_APP_BASE_URL}/api/updateNotes`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prevNote),
    })
    const noteResponse = await noteReq.json();
    if (noteResponse.status === "success") {
      setShowEditableCard(false)
      toast.success('Note updated succesfully.', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      fetchNotesFunction();
      setNote({
        title: '',
        message: '',
      })
    }
    }
    else{
      toast.warning('Please write Something!!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    }


  return (
    <>
    {/* Editable Card */}
    {showEditableCard === true &&  showNotesInput === undefined ? 
      <div className="notes-input-section-editable-container">
        <div className="notes-input-section">
    <div className="notes-first-input-row">
      <input className='notes-title-input' name="title" type="text" placeholder='Title' rel="noreferrer" onChange={handleInputs} value={note.title} />
      <span className='notes-pin-icon-container'>{note.status === "pinned" ? <BsFillPinFill onClick={()=>setNote({...note,status: "normal"})} className='notes-pin-icon' size={25}  /> : <BsPin onClick={()=>{setNote({...note,status: "pinned"})}} className='notes-pin-icon' size={25} />}</span>
    </div>
    <textarea rows="2" cols="50" name="message" className='notes-message-input' type="text" placeholder='Take a note...' onChange={handleInputs} value={note.message}  rel="noreferrer"/>
    <div className="notes-last-input-row">
    <div className="notes-input-options">
    <span className='notes-input-option-icon-container'>{note.status === "archived" ? <IoMdArchive size={20} className='notes-input-option-icon' onClick={()=>setNote({...note,status: "normal"})}  /> :<MdOutlineArchive onClick={()=>setNote({...note,status: "archived"})} size={20} className='notes-input-option-icon' />}</span>
      <span className='notes-input-option-icon-container'><MdDeleteOutline onClick={()=>deleteNotesFunction(singleNote)}  size={20} className='notes-input-option-icon' /></span>
    </div>
    <span className='notes-last-input-row-close-button' onClick={()=>setShowEditableCard(false)}>CLOSE</span>
    </div>
    <span className="notes-add-badge-button-container" onClick={()=>{if (note.status === "pinned") {
      updateNote(note,singleNote,"pinned")
    }
    else if(note.status === "archived"){
      updateNote(note,singleNote,"archived")
    }
    else {
      updateNote(note,singleNote)
    }
    }}><MdAdd className="notes-add-badge-button" size={25} /></span>
  </div>
      </div>
    :

    // Normal card
    <div className={"notes-input-section"} style={{width: changeLayout === 'flex' ? "100%" : ''}} >
    {showNotesInput === true ? <div className="notes-first-input-row">
      <input className='notes-title-input' name="title" value={note.title} onChange={handleInputs} type="text" placeholder='Title' rel="noreferrer" />
      <span className='notes-pin-icon-container'>{note.status === "pinned" ? <BsFillPinFill onClick={()=>setNote({...note,status: "normal"})} className='notes-pin-icon' size={25}  /> : <BsPin onClick={()=>setNote({...note,status: "pinned"})} className='notes-pin-icon' size={25} />}</span>
    </div> : showNotesInput === undefined && <div className="notes-first-input-row">
      <h3 className='notes-title-input' onClick={()=>setShowEditableCard(true)}>{title}</h3>
      {trashNotesSate === true ? "" : <span className={noteStatus === "pinned" ? "notes-pinned-icon-container" : "notes-pin-icon-container"}>{noteStatus === "pinned" ? <BsFillPinFill style={{opacity: 1}} className='notes-pin-icon' size={25} onClick={()=>updateNotesStatusFunction(singleNote,"normal")}  /> :<BsPin className='notes-pin-icon' size={25} onClick={()=>updateNotesStatusFunction(singleNote,"pinned")} />}</span>}
    </div> }
    {showNotesInput !== undefined ? <textarea name="message" value={note.message} onChange={handleInputs} onClick={()=>{if (showNotesInput === false) {
        setShowNotesInput(true)
    }}} rows="2" cols="50" className='notes-message-input' type="text" placeholder='Take a note...'  rel="noreferrer"/>: <p className='notes-message-input' onClick={()=>setShowEditableCard(true)}>{message}</p>}
    {showNotesInput === true ? <div className="notes-last-input-row">
    <div className="notes-input-options">
      <span className='notes-input-option-icon-container'>{note.status === "archived" ? <IoMdArchive size={20} className='notes-input-option-icon' onClick={()=>setNote({...note,status: "normal"})}  /> :<MdOutlineArchive onClick={()=>setNote({...note,status: "archived"})} size={20} className='notes-input-option-icon' />}</span>
    </div>
    <span className='notes-last-input-row-close-button' onClick={()=>{if (showNotesInput === true) {
        setShowNotesInput(false)
    }}}>CLOSE</span>
    </div>: showNotesInput === undefined && <div className="notes-last-input-row">
    <div className="notes-input-options">
      {trashNotesSate === true ?
      <><span className='notes-input-option-icon-container'><MdOutlineRestore onClick={()=>restoreNote(singleNote)} size={20} className='notes-input-option-icon' /></span>
      <span className='notes-input-option-icon-container'><MdDeleteOutline onClick={()=>deletePermanentNotesFunction(singleNote)}  size={20} className='notes-input-option-icon' /></span></> :<><span className='notes-input-option-icon-container'><MdOutlineArchive onClick={()=>updateNotesStatusFunction(singleNote,"archived")} size={20} className='notes-input-option-icon' /></span>
      <span className='notes-input-option-icon-container'><MdDeleteOutline onClick={()=>deleteNotesFunction(singleNote)} size={20} className='notes-input-option-icon' /></span></>}
    </div>
    </div>}
    {showNotesInput !== undefined && <span className="notes-add-badge-button-container" onClick={()=>{addNote(note)}}><MdAdd className="notes-add-badge-button" size={25} /></span>}
  </div>}
    </>
  )
}

export default InputCard