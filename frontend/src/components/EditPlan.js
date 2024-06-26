import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UserNavbar";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';


const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
const EditTraningPlan = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [exercises, setExercises] = useState()
    const [choosenPlan, setChosenPlan] = useState('Choose traning plan')
    const [choosenPlanPk, setChosenPlanPk] = useState('')
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

    function handleUpdateTraningPlan() {
        client.put(`/api/training-plan-update/${choosenPlanPk}`, {
            author: localStorage.getItem('userId'),
            name: name,
            informations: description,
            exercises_ids: makePostExercisesArray(),
            main_plan: isChecked
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`
                }
            }
        ).then(res => {
            filedsClear()
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
        setChosenPlanPk(plan.id)
        setChosenPlan(`${plan.name}`)
        setName(plan.name)
        setDescription(plan.informations)
        setIsChecked(plan.main_plan)
        const planExercises = plan.exercises.map(exercise => exercise.name)
        setChoosedExercises(planExercises)
    }
        
    function deleteFromSelectedExercises(exercise) {
        let exercises = [...choosedExercises];
        exercises = exercises.filter(exerciseList => exerciseList != exercise)
        setChoosedExercises(exercises) 
    }

    function selectExercise(exercise) {
        const exercises = [...choosedExercises];
        if (!exercises.includes(exercise)) {
            exercises.push(exercise)
        } 
        setChoosedExercises(exercises) 
    }

    function makePostExercisesArray() {
        let tempArray = []
        tempArray = exercises
        .filter(exercise => choosedExercises.includes(exercise.name))
        .map(exercise => exercise.id)
        return tempArray
    }

    function deletePlan() {
        choosenPlan ?
        client.delete(`/api/training-plan-delete/${choosenPlanPk}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then((res) => {
            filedsClear()
        }).catch(error => console.log(error)) : setErrorMessage("You have not chosen any traning plan")

    }

    function filedsClear() {
        setChosenPlan('Choose traning plan')
        getExercises()
        getTraningPlanList() 
        setChoosedExercises([])
        setName('')
        setDescription('')
    }

    return (
        <>
        <Navbar />
        
        <div className="main-container-img-form">
                <div className="logo-container">
                <img src="/GBlogo.png" alt="GB Logo" className="logo" /> 
                </div>
                <div className="container-form">
            <h1>Choose traning plan which you want to edit.</h1>
            <Form onSubmit={handleUpdateTraningPlan}>
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
                        <Dropdown.Item key={plan.id} onClick={() => chosenPlanAction(plan)}>
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
                <Button 
                    variant="dark"
                    onClick={() => deleteFromSelectedExercises(exercise)}
                    onMouseEnter={(e) => e.stopPropagation()}
                    style={{marginLeft: "15px", marginTop: "5px"}}
                >
                    ☓
                </Button>
                </div>
                ))}
               
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {exercises ? (exercises.map((exercise) => (
                    <><Dropdown.Item key={exercise.id} onClick={() => selectExercise(exercise.name)}>
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
              
              <Button variant="secondary" type="submit" style={{marginTop: "15px", marginRight: "10px"}}>
                Edit
              </Button>
              <Button variant="secondary" onClick={() => deletePlan()} style={{marginTop: "15px"}}>
                Delete Plan
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


export default EditTraningPlan