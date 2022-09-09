import React from 'react';
import './index.css';
import {BsPin} from 'react-icons/bs';
import {MdOutlineArchive,MdAdd} from 'react-icons/md';

const InputCard = ({showNotesInput,setShowNotesInput}) => {
  return (
    <div className="notes-input-section" onMouseLeave={()=>{if (showNotesInput === true) {
        setShowNotesInput(false)
    }
    else if(showNotesInput === undefined){
        console.log("nothing")
    }}}>
    {showNotesInput === true ? <div className="notes-first-input-row">
      <input className='notes-title-input' type="text" placeholder='Title' rel="noreferrer" />
      <span className='notes-pin-icon-container'><BsPin className='notes-pin-icon' size={25} /></span>
    </div> : showNotesInput === undefined && <div className="notes-first-input-row">
      <h3 className='notes-title-input'>Title</h3>
      <span className='notes-pin-icon-container'><BsPin className='notes-pin-icon' size={25} /></span>
    </div> }
    {showNotesInput !== undefined ? <textarea onClick={()=>{if (showNotesInput === false) {
        setShowNotesInput(true)
    }
    else if(showNotesInput === undefined){
        console.log("nothing")
    }}} rows="2" cols="50" className='notes-message-input' type="text" placeholder='Take a note...'  rel="noreferrer"/>: <p className='notes-message-input'>gvfuregfu rgufregur ryuohworegbo ergubrtw yueroygboe wrtyerg eb</p>}
    {showNotesInput === true ? <div className="notes-last-input-row">
    <div className="notes-input-options">
      <span className='notes-input-option-icon-container'><MdOutlineArchive size={20} className='notes-input-option-icon' /></span>
    </div>
    <span className='notes-last-input-row-close-button'>CLOSE</span>
    </div>: showNotesInput === undefined && <div className="notes-last-input-row">
    <div className="notes-input-options">
      <span className='notes-input-option-icon-container'><MdOutlineArchive size={20} className='notes-input-option-icon' /></span>
    </div>
    </div>}
    {showNotesInput !== undefined && <span className="notes-add-badge-button-container"><MdAdd className="notes-add-badge-button" size={25} /></span>}
  </div>
  )
}

export default InputCard