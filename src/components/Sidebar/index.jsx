import React from 'react';
import './index.css';
import {Row,Col} from 'react-bootstrap';
import {HiOutlineLightBulb} from 'react-icons/hi';
import {FaRegBell} from 'react-icons/fa';
import {BiArchiveIn} from 'react-icons/bi';
import {RiDeleteBinLine} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='side-bar-container'>
        <Row className='side-bar-row'><Link to="/"><span className='side-bar-home-icon-container side-bar-icon-container'><HiOutlineLightBulb color='gray' className='side-bar-home-icon side-bar-icon' size={30} /><span className="side-bar-icon-text">Notes</span></span></Link></Row>
        <Row className='side-bar-row'><Link to="/reminder"><span className='side-bar-reminder-icon-container side-bar-icon-container'><FaRegBell color='gray' className='side-bar-reminder-icon side-bar-icon' size={30} /><span className="side-bar-icon-text">Reminder</span></span></Link></Row>
        <Row className='side-bar-row'><Link to="/archive"><span className='side-bar-archive-icon-container side-bar-icon-container'><BiArchiveIn color='gray' className='side-bar-archive-icon side-bar-icon' size={30} /><span className="side-bar-icon-text">Archive</span></span></Link></Row>
        <Row className='side-bar-row'><Link to="/bin"><span className='side-bar-bin-icon-container side-bar-icon-container'><RiDeleteBinLine color='gray' className='side-bar-bin-icon side-bar-icon' size={30} /><span className="side-bar-icon-text">Trash</span></span></Link></Row>
    </div>
  )
}

export default Sidebar