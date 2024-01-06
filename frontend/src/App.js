
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from "./pages/Authentication"
import "react-bootstrap/dist/react-bootstrap.min.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Authentication />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
