import React from "react";
import { useEffect, useState} from "react";
import Navbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";
import TraningPlan from "../components/TraningPlan";
 

const Home = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'))
    const navigate = useNavigate()
    if (currentUser) {
        return (
            <>
            <Navbar />
            <div>
                <TraningPlan/>
            </div>
            </>
        );
    } else {
        navigate("/login")
    }
    
}

export default Home