import React from "react"
import axios from "axios"
import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Navbar from "../components/UserNavbar";
import Form from 'react-bootstrap/Form';
import "../style/Form.css"

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})


const AddCategoryForm = () => {

    const [name, setName] = useState('')

    function handleAddCategory() {
        client.post("/api/exercise-category-create/", 
            {
                author: localStorage.getItem('userId'),
                name: name,
            },
            {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then(res => console.log(res)).catch(error => console.log(error))
    }

    return (
        <>
        <Navbar/>
        <div className="main-container-img-form">
        <div className="logo-container">
        <img src="/GBlogo.png" alt="GB Logo" className="logo" /> 
        </div>
        <div className="container-form">
            <h1>Add Exercise Category</h1>
            <Form onSubmit={handleAddCategory}>
              <Form.Group className="mb-3" controlId="formBasicTpName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Type in name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </Form.Group>
        
                
                <Button variant="secondary" type="submit">
                    Add
                </Button>
            </Form>
        </div>
        <div className="logo-container">
        <img src="/GBlogo.png" alt="GB Logo" className="logo" /> 
        </div>
        </div>
    </>
    )

}

export default AddCategoryForm