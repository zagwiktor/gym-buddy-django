import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setErrorMessage] = useState("")
    const { setRegisterSucces } = useAuthContext()

    const navigate = useNavigate()

    function submitRegister(e) {
        e.preventDefault();
        client.post('/authentication/register/', {
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            email: email
        }).then((res) => {
          if (res.status == 201) {
            setRegisterSucces(`User: ${res.data.username} has been registered`)
            navigate('/login')
          }
        }).catch(error => {
          let errorMesFromResponse = ''
          if (error.response){
            Object.entries(error.response.data).forEach(([k,v]) =>{
              errorMesFromResponse += `${k}: ${v} \n`
            }) 
          }
          setErrorMessage(errorMesFromResponse.replace(',', " "))
        })
    }

    return(
        <div>
        <Form onSubmit={submitRegister}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirsName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type in your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type in your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type in your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Text className="text-muted">
             <a href="/login">Do you have an account? Log in!</a>
          </Form.Text>
          <div>
          <Form.Text className="text-muted">
             {message}
          </Form.Text>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          
        </Form>
       </div>
    )
}

export default RegisterForm