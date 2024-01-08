
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from "./pages/Home"
import RegisterForm from "./components/RegisterForm"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/register' element={<RegisterForm />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
