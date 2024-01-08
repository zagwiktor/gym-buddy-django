import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
const UserNavbar = () => {
    const [username, setUsername] = useState(localStorage.getItem('username')) 

    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem("username", "")
        localStorage.setItem("token", "")
        localStorage.setItem("currentUser", "false")
        localStorage.clear();
        navigate("/login")
    }

    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">GymBuddy</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
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