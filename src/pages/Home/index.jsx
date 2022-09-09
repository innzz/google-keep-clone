import React, { useState } from 'react';
import './index.css';
import Cards from '../../components/Cards';
import InputCard from '../../components/InputCard';

const Home = () => {
  const [showNotesInput, setShowNotesInput] = useState(false);
  return (
    <div className='home-container'>
      <div className="home-content">
          <InputCard showNotesInput={showNotesInput} setShowNotesInput={setShowNotesInput} />
          <Cards />
      </div>
    </div>
  )
}

export default Home