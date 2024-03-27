import React from "react";
import Navbar from "../components/UserNavbar";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import "../style/Form.css"

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

const AddExerciseForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [categories, setCategories] = useState('')
    const [choosedCategory, setchoosedCategory] = useState('Choose Category')
    const [categoryPk, setCategoryPk] = useState('Choose Category')
    const [sets, setSets] = useState(5);
    const [repetitions, setRepetitions] = useState(5);
    function handleAddExercise(){
        client.post("/api/exercise-create/", 
            {
                author: localStorage.getItem('userId'),
                name: name,
                description, description,
                category: categoryPk,
                repetitions: repetitions,
                sets: sets
            },
            {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then(res => console.log(res)).catch(error => console.log(error))
    }

    function getCategories() {
        client.get('/api/exercise-category-list/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }
            }).then((res) => {
                setCategories(res.data)
            }).catch(error => console.log(error))
        }

    useEffect(()=>{
        getCategories()
        
    }, [])

    
    return (
        <>
        <Navbar/>
        <div className="main-container-img-form">
        <div className="logo-container">
        <img src="/GBlogo.png" alt="GB Logo" className="logo" /> 
        </div>
        <div className="container-form">
            <h1>Add Exercise</h1>
            <Form onSubmit={handleAddExercise}>
              <Form.Group className="mb-3" controlId="formBasicTpName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Type in name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicTpInfo">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type in description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSets">
                    <Form.Label>Sets</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter sets"
                        value={sets}
                        onChange={e => setSets(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRepetitions">
                    <Form.Label>Repetitions</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter repetitions"
                        value={repetitions}
                        onChange={e => setRepetitions(e.target.value)}
                    />
                </Form.Group>
                <Dropdown data-bs-theme="dark" style={{paddingBottom: "10px"}}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {choosedCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {categories ? (categories.map((category) => (
                    <>
                    <Dropdown.Item key={category.id} onClick={() => {setchoosedCategory(`${category.name}`)
                        setCategoryPk(category.id)
                        
                        }}>
                        {category.name}
                    </Dropdown.Item><Dropdown.Divider />
                    </>
                    ))) : (<Dropdown.Item>Category have not found</Dropdown.Item>)}
                </Dropdown.Menu>
                </Dropdown>

                <Form.Text className="text-muted">
                    {errorMessage}
                </Form.Text>
              
                <Button variant="secondary" type="submit" style={{ marginTop: '15px' }} >
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

export default AddExerciseForm