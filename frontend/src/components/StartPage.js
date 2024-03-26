import React from "react"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import "../style/StartPage.css"

const StartPage = () => {
    const navigate = useNavigate();
    return (
        <div className="container-start">
            <h2>Coordinate your training with</h2>
            <img src="/GBlogo.png" alt="GB Logo" className="logo" /> 
            <div className="buttons-container-start"> 
                <Button variant="secondary" size="lg" onClick={() => navigate("/login")}>
                    Sing in
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate("/register")}>
                    Sing up
                </Button>
            </div>
        </div>
    );
}


export default StartPage