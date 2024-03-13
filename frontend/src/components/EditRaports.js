import { useState } from "react";
import Navbar from "../components/UserNavbar";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { useEffect } from "react";
import Button from 'react-bootstrap/Button'

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
const EditRaports = () => {
    const [raports, setRaports] = useState(null)
    const [choosedRaport, setShoosedRaport] = useState(null)
    const [weight, setWeight] = useState(null)
    const [calories, setCalories] = useState(null)
    const [chestCircuit, setChestCircuit] = useState(null)
    const [bicepsCircuit, setBicepsCircuit] = useState(null)
    const [thighCircuit, setThighCircuit] = useState(null)
    const [waistCircuit, setWaistCircuit] = useState(null)
    const [calfCircuit, setCalfCircuit] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    function getRaports() {
        client.get('/api/raports-list/', {
            headers : {
                'Authorization': `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setRaports(res.data))
        .catch(error=>console.log(error))
    }

    function chosenRaport() {

    }

    useEffect(() => {
        getRaports() 
    },[])

    return (
        <>
        <Navbar/>
            <h1>Choose raport which you want to edit.</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicTpInfo">
                <Form.Label>Raports</Form.Label>
                    <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {choosedRaport ? choosedRaport.date : <>Choose raport</>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {raports ? (raports.map((raport) => (
                        <><Dropdown.Item key={raport.id} onClick={() => {chosenRaport(raport)
                            }}>
                            {raport.date}
                        </Dropdown.Item><Dropdown.Divider /></>
                        ))) : (<Dropdown.Item>Raports have not found</Dropdown.Item>)}
                    </Dropdown.Menu>
                    </Dropdown>
            </Form.Group>
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
                Edit
            </Button>
            <Button variant="primary">
                Delete
            </Button>
        </Form>
        </>
    )

}

export default EditRaports