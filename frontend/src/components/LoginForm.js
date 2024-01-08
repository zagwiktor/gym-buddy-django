import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const LoginForm = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"))
  const [password, setPassword] = useState("")
  const initialCurrentUserState = localStorage.getItem("currentUser") === "true";
  const [currentUser, setCurrentUser] = useState(initialCurrentUserState)
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(localStorage.getItem("token"))

  const redirectToHome = () => {
    navigate('/home');
  };

  function submitLogin(e) {
    setErrorMessage('')
    e.preventDefault();
    client.post("/authentication/login/", {
      username: username,
      password: password,
    }).then(function (res) {
      setCurrentUser(true);
      setToken(res.data['token'])
      localStorage.setItem('currentUser', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('token', res.data['token']);
      redirectToHome();
    }).catch(error => {
      setErrorMessage(error.response.data.error)
    });
  }

  useEffect(() => {
    if (currentUser) {
      redirectToHome();
    }
  }, [currentUser]);
    
  const navigate = useNavigate();

  if (!currentUser){
    return (
      <div >
        <Form onSubmit={submitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
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
          <Form.Text className="text-muted">
             <a href="/register">Do you not have an account? Sign up!</a>
          </Form.Text>
          <div>
          <Form.Text className="text-muted">
             {errorMessage}
          </Form.Text>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  } else {
    return (
      <div>
        <Form.Text className="text-muted">
             You have already logged in!
        </Form.Text>
        <Button variant="primary" type="submit" onClick={redirectToHome}>
            Go to home
        </Button>
      </div>
    );
  }
  
};

export default LoginForm;