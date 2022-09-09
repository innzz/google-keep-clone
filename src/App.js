import './App.css';
import {Routes,Route} from 'react-router-dom';

import {Home,Reminder,Bin,Archive} from './pages';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/bin" element={<Bin />} />
        <Route exact path="/archive" element={<Archive />} />
        <Route exact path="/reminder" element={<Reminder />} />
      </Routes>
    </div>
  );
}

export default App;
