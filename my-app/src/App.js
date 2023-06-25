
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EmployeePage from './components/EmployeePage';
import Modal from './components/modal/modal';
import Contract from './components/Contract2';
import Youtube from'./components/youtube';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/youtube" element={<Youtube />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
