import React from 'react';
import './index.css'
import {Col, Row} from 'react-bootstrap';
import {FiMenu,FiGrid} from 'react-icons/fi';
import {GrNotes} from 'react-icons/gr';
import {HiOutlineSearch} from 'react-icons/hi';
import {MdRefresh} from 'react-icons/md';
import icon from '../../assets/images/icon.png';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <Row className='navbar-container-row'>
        <Col className='navbar-container-col'>
          {/* <FiMenu className='menu-icon' size={22}/> */}
          <span className='nav-icon-container'><Link to="/"><img className='nav-icon' src={icon} alt="NotesIcon" rel="noreferrer"></img></Link></span>
          <Link to="/"><h1 style={{cursor: "pointer"}} className='nav-notes-text'>Notes</h1></Link>
        </Col>
        <Col className='navbar-container-col'>
          <div className="nav-search-container">
            <HiOutlineSearch className='search-nav-icon' size={25} />
            <input placeholder='Search' className='search-nav-input' ></input>
          </div>
        </Col>
        <Col className='navbar-container-col'>
          <MdRefresh className='refresh-nav-icon' size={25} />
          <FiGrid className='grid-icon' size={25} />
        </Col>
      </Row>
      <Sidebar />
    </div>
  )
}

export default Navbar