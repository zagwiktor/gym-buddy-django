
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from "./pages/Home"
import RegisterForm from "./components/RegisterForm"
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext'


function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/register' element={<RegisterForm />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
}

export default App;
