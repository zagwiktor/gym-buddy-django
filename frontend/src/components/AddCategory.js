import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from "../components/UserNavbar";
import Form from 'react-bootstrap/Form';

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
        <div>
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
        
                
                <Button variant="primary" type="submit" >
                    Add
                </Button>
            </Form>
        </div>
    </>
    )

}

export default AddCategoryForm