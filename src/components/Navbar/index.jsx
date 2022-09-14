import React, { lazy } from 'react';
import './index.css'
import {Col, Row} from 'react-bootstrap';
import {FiMenu,FiGrid} from 'react-icons/fi';
import {GrNotes} from 'react-icons/gr';
import {HiOutlineSearch} from 'react-icons/hi';
import {MdRefresh} from 'react-icons/md';
import {TbLayoutList} from 'react-icons/tb';
import icon from '../../assets/images/icon.png';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({changeLayout,setChangeLayout}) => {
  // const [searchHover, setSearchHover] = useState(false);
  // console.log(searchValue)
  return (
    <div className='navbar-container'>
      <Row className='navbar-container-row'>
        <Col className='navbar-container-col'>
          <span className='nav-icon-container'><Link to="/"><img className='nav-icon' src={icon} alt="NotesIcon" rel="noreferrer"></img></Link></span>
          <Link to="/"><h1 style={{cursor: "pointer"}} className='nav-notes-text'>Notes</h1></Link>
        </Col>
        <Col className='navbar-container-col'>
          {/* <div className={searchHover ? "nav-search-container-hover" : "nav-search-container"} >
            <HiOutlineSearch className='search-nav-icon' size={25} />
            <input placeholder='Search' onClick={()=>setSearchHover(true)} onBlur={()=>setSearchHover(false)} onChange={(e)=>setSearchValue(e.target.value)} className='search-nav-input' value={searchValue} ></input>
          </div> */}
        </Col>
        <Col className='navbar-container-col'>
          {/* <MdRefresh className='refresh-nav-icon' size={25} /> */}
          {changeLayout === 'grid' ? <TbLayoutList className='grid-icon' size={25} onClick={()=>{
            if (changeLayout === 'grid') {
              setChangeLayout('flex')
            }
            else {
              setChangeLayout('grid')
            }
          }} /> : <FiGrid className='grid-icon' size={25} onClick={()=>{
            if (changeLayout === 'grid') {
              setChangeLayout('flex')
            }
            else {
              setChangeLayout('grid')
            }
          }} />  }
        </Col>
      </Row>
      <Sidebar />
    </div>
  )
}

export default Navbar