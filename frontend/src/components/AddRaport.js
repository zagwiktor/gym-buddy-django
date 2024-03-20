import React, { useEffect, useState } from "react"
import Navbar from "../components/UserNavbar"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios"


const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

const AddRaport = () => {
    const [weight, setWeight] = useState(null)
    const [calories, setCalories] = useState(null)
    const [chestCircuit, setChestCircuit] = useState(null)
    const [bicepsCircuit, setBicepsCircuit] = useState(null)
    const [thighCircuit, setThighCircuit] = useState(null)
    const [waistCircuit, setWaistCircuit] = useState(null)
    const [calfCircuit, setCalfCircuit] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    function handleAddRaport(e) {
        e.preventDefault();
        client.post('api/raports-create/', {
            author: localStorage.getItem('userId'),
            weight: weight,
            calories: calories,
            chest_circuit: chestCircuit,
            biceps_circuit: bicepsCircuit,
            thigh_circuit: thighCircuit,
            waist_circuit: waistCircuit,
            calf_circuit: calfCircuit
        },
        {
            headers: {
            'Authorization': `Token ${localStorage.getItem("token")}`,
        }}).then( res =>
            setErrorMessage("The report has been added")
        ).catch(error => setErrorMessage(error.message))

    }
    
    return (
        <>
            <Navbar/>
            <h1>Add raport</h1>
            <div>
            <Form onSubmit={handleAddRaport}>
                <Form.Group className="mb-3" controlId="formBasicWeight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter weight"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCalories">
                    <Form.Label>Calories</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter calories"
                        value={calories}
                        onChange={e => setCalories(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicChestCircuit">
                    <Form.Label>Chest circuit</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter chest circuit"
                        value={chestCircuit}
                        onChange={e => setChestCircuit(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSets">
                    <Form.Label>Biceps circuit</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter biceps circuit"
                        value={bicepsCircuit}
                        onChange={e => setBicepsCircuit(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSets">
                    <Form.Label>Thigh circuit</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter thigh circuit"
                        value={thighCircuit}
                        onChange={e => setThighCircuit(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSets">
                    <Form.Label>Waist circuit</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter waist circuit"
                        value={waistCircuit}
                        onChange={e => setWaistCircuit(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSets">
                    <Form.Label>Calf circuit</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter calf circuit"
                        value={calfCircuit}
                        onChange={e => setCalfCircuit(e.target.value)}
                    />
                </Form.Group>
                <Form.Text className="text-muted">
                    {errorMessage}
                </Form.Text>
                <Button variant="primary" type="submit" >
                    Add
                </Button>
            </Form>
            </div>
        </>
    )

}

export default AddRaport