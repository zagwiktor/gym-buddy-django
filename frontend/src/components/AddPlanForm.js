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

const AddPlanForm = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'))
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [exercises, setExercises] = useState()
    const [choosedExercises, setChoosedExercises] = useState('Choose Exercises')
    const [postExercises, setPostExercises] = useState([])
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate()

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
            author: userId,
            name: name,
            informations: description,
            exercises: makePostExercisesArray(),
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
        if (!currentUser) {
            navigate("/login");
        } else {
            getExercises()
        }
    }, []);

    function concateChooseExercises(exerciseId, exerciseName) {
        let exercise = `${exerciseId}. "${exerciseName}"`
        const updatedExercises = [...postExercises, exerciseName];
        setPostExercises(updatedExercises);
        if (choosedExercises == 'Choose Exercises') {
            setChoosedExercises(exercise)
        } else {
            if(!choosedExercises.includes(exerciseName)) {
                setErrorMessage('')
                setChoosedExercises(choosedExercises + ', ' + exercise)
            } else {
                setErrorMessage('You already have added that exercise')
                makePostExercisesArray()
            }
        }
    }

    function makePostExercisesArray() {
        let tempArray = []
        tempArray = exercises.map((exercise) => {
            if (postExercises.includes(exercise.name)) {
                return exercise
            }
        })
        return tempArray
    }


    return (
    
        <>
        <Navbar />
        <div>
            <h1>Add traning plan</h1>
            <Form onSubmit={handleAddTraningPlan}>
              <Form.Group className="mb-3" controlId="formBasicTpName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Type in name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBasicTpInfo">
                <Form.Label>Exercises</Form.Label>
                <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {choosedExercises}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {exercises ? (exercises.map((exercise) => (
                    <><Dropdown.Item key={exercise.id} onClick={() => concateChooseExercises(exercise.id, exercise.name)}>
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

export default AddPlanForm