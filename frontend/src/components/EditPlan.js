import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UserNavbar";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
const EditTraningPlan = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [exercises, setExercises] = useState()
    const [choosenPlan, setChosenPlan] = useState('Choose traning plan')
    const [choosedExercises, setChoosedExercises] = useState([])
    const [trainingPlans, setTrainingPlans] = useState([])
    const [isChecked, setIsChecked] = useState(false)

    function getTraningPlanList() {
        client.get("/api/training-plan-list/", {

            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then((res) => {
            setTrainingPlans(res.data)
        }).catch(error => console.log(error))
    }

    function getExercises() {
        client.get('/api/exercise-list/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }
            }).then((res) => {
                setExercises(res.data)
            }).catch(error => console.log(error))
    }

    function handleAddTraningPlan() {
        client.post('api/training-plan-create/', {
            author: localStorage.getItem('userId'),
            name: name,
            informations: description,
            exercises_ids: 5,
            main_plan: isChecked
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        ).then(res => {
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
    }
    
    
    useEffect(() => {
        getTraningPlanList()
        getExercises()
    }, []);
 
    function chosenPlanAction(plan) {
        setChosenPlan(`${plan.name}`)
        setName(plan.name)
        setDescription(plan.informations)
        setIsChecked(plan.main_plan)
        const planExercises = plan.exercises.map(exercise => exercise.name)
        setChoosedExercises(planExercises)
        console.log(choosedExercises)
    }
        
    return (
        <>
        <Navbar />
        <div>
            <h1>Choose traning plan which you want to edit.</h1>
            <Form onSubmit={handleAddTraningPlan}>
            <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {choosenPlan}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {trainingPlans.map(plan => plan.main_plan ? (
                        <Dropdown.Item key={plan.id} onClick={() => chosenPlanAction(plan)}>
                            {`${plan.name} ★`}
                        </Dropdown.Item>
                    ):
                        <Dropdown.Item key={plan.id}>
                            {plan.name}
                        </Dropdown.Item>
                    )}
                    </Dropdown.Menu>
              </Dropdown>   
              <Form.Group className="mb-3" controlId="formBasicTpName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type in name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicTpInfo">
                <Form.Label>Exercises</Form.Label>
                <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {choosedExercises.map((exercise, index) => (
                    <div key={index}>
                    {exercise}
                    <Button variant="primary">
                        ☓
                    </Button>
                </div>
                ))}  
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {exercises ? (exercises.map((exercise) => (
                    <><Dropdown.Item key={exercise.id}>
                        {exercise.name}
                    </Dropdown.Item><Dropdown.Divider /></>
                    ))) : (<Dropdown.Item>Exercises have not found</Dropdown.Item>)}
                </Dropdown.Menu>
                </Dropdown>
                </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicTpInfo">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type in description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

            <Form.Label>Main Plan</Form.Label>
            <InputGroup>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
            </InputGroup>
              
              
              <Form.Text className="text-muted">
                 {errorMessage}
              </Form.Text>
              
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
        </div>
        </>
    )

}


export default EditTraningPlan