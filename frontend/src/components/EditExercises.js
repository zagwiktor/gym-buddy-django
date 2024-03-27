import Navbar from "../components/UserNavbar";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import "../style/Form.css"

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
const EditExercises = () => {
    const [exercises, setExercises] = useState()
    const [choosedExercise, setChoosedExercises] = useState()
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [categories, setCategories] = useState('')
    const [choosedCategory, setChoosedCategory] = useState('Category of exercise')
    const [categoryPk, setCategoryPk] = useState('')
    const [sets, setSets] = useState(5);
    const [repetitions, setRepetitions] = useState(5);
    const [name, setName] = useState('')


    function getExercises() {
        client.get('/api/exercise-list/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }
            }).then((res) => {
                setExercises(res.data)
            }).catch(error => console.log(error))
    }

    function deleteExercise() {
        choosedExercise ?
        client.delete(`/api/exercise-delete/${choosedExercise.id}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }).then((res) => {
            filedsClear()
        }).catch(error => console.log(error)) : setErrorMessage("You have not chosen any exercise")

    }

    function handleExerciseUpdate() {
        client.put(`/api/exercise-update/${choosedExercise.id}`,
            { 
                name: name,
                description: description,
                author: localStorage.getItem('userId'),
                sets: sets,
                repetitions: repetitions,
                category: categoryPk
            },
            {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }
        }).then(
            filedsClear()
        ).catch(error => console.log(error))
    }

    function filedsClear() {
        getExercises()
        setChoosedExercises('')
        setName('')
        setChoosedCategory('Category of exercise')
        setDescription('')
        setSets(5)
        setRepetitions(5)
    }
    useEffect(() => {
        getExercises()
        getCategories()
    }, [])

    function getCategories() {
        client.get('/api/exercise-category-list/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                }
            }).then((res) => {
                setCategories(res.data)
            }).catch(error => console.log(error))
    }

    function chosenExercise(exercise) {
        setChoosedExercises(exercise)
        setDescription(exercise.description)
        setSets(exercise.sets)
        setRepetitions(exercise.repetitions)
        setName(exercise.name)
        categories.forEach(element => {
            if (element.id == exercise.category) {
                setChoosedCategory(element.name)
                setCategoryPk(exercise.category)
            }
        });

    }


    return (
        <>
        <Navbar/>   
        <Form onSubmit={handleExerciseUpdate}> 
        <h1>Choose exercise which you want to edit.</h1>
        <Form.Group className="mb-3" controlId="formBasicTpInfo">
            <Form.Label>Exercises</Form.Label>
                <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {choosedExercise ? choosedExercise.name : <>Choose exercise</>}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {exercises ? (exercises.map((exercise) => (
                    <><Dropdown.Item key={exercise.id} onClick={() => {chosenExercise(exercise)
                        }}>
                        {exercise.name}
                    </Dropdown.Item><Dropdown.Divider /></>
                    ))) : (<Dropdown.Item>Exercises have not found</Dropdown.Item>)}
                </Dropdown.Menu>
                </Dropdown>
        </Form.Group>
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
                    <Dropdown.Item key={category.id} onClick={() => {setChoosedCategory(`${category.name}`)
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
        <Button variant="primary" type="submit">
            Edit
        </Button>
        <Button variant="primary" onClick={() => deleteExercise()}>
            Delete Exercise
        </Button>
        </Form>
        </>
    )

}

export default EditExercises