
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from "./pages/Home"
import RegisterForm from "./components/RegisterForm"
import AddPlanForm from './components/AddPlanForm';
import AddExerciseForm from './components/AddExerciseForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext'
import AddCategoryForm from './components/AddCategory';
import EditExercises from './components/EditExercises';
import EditTraningPlan from './components/EditPlan';
import EditCategory from './components/EditCategory';
import AddRaport from './components/AddRaport';
import Raports from './components/Raports';
import EditRaports from './components/EditRaports';
import StartPage from './components/StartPage';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<StartPage />}/>
            <Route path='/login' element={<LoginForm />}/>
            <Route path='/register' element={<RegisterForm />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/add-plan' element={<AddPlanForm />}/>
            <Route path='/add-exercise' element={<AddExerciseForm />}/>
            <Route path='/add-category' element={<AddCategoryForm />}/>
            <Route path='/edit-exercise' element={<EditExercises />}/>
            <Route path='/edit-traning-plan' element={<EditTraningPlan />}/>
            <Route path='/edit-categories' element={<EditCategory />}/>
            <Route path='/add-raport' element={<AddRaport />}/>
            <Route path='/raports' element={<Raports />}/>
            <Route path='/edit-raports' element={<EditRaports />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App;
