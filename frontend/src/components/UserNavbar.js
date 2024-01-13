import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

const UserNavbar = () => {
    const [username, setUsername] = useState(localStorage.getItem('username')) 
    const [data, setData] = useState('')
    const [trainingPlans, setTrainingPlans] = useState([]);
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate("/login")
    }

    function getTraningPlanList() {
        client.get("/api/training-plan-list/", 
        {
            headers: {
            'Authorization': `Token ${localStorage.getItem("token")}`,
        }}).then((res) => {
            setData(res.data)
            console.log(res.data)
            setTrainingPlans(res.data)
        }).catch(error => console.log(error))
    }

    function setMainPlan(planId) {
        client.put(`/api/training-plan-update/${planId}`, {
            "main_plan": true
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`
            }
        }).then(res => refreshPage()).catch(error => {
            console.error("There was an error!", error);
        });
    }

    useEffect(() => {
        getTraningPlanList()
      }, []);

      const handlePlanClick = (planId) => {
        setMainPlan(planId)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">GymBuddy</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Your Training Plans" id="basic-nav-dropdown">
                    {trainingPlans.map(plan => plan.main_plan ? (
                        <NavDropdown.Item key={plan.id} onClick={() => handlePlanClick(plan.id)}>
                            {`${plan.name} ★`}
                        </NavDropdown.Item>
                    ):
                        <NavDropdown.Item key={plan.id} onClick={() => handlePlanClick(plan.id)}>
                            {plan.name}
                        </NavDropdown.Item>
                    )}
                </NavDropdown>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{ paddingRight: '15px' }}>
                Signed in as: {username}
                </Navbar.Text>
                <Button type="submit" onClick={logout}>Logout</Button>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  );   
}

export default UserNavbar