import axios from "axios"
import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { useNavigate} from "react-router-dom";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
const TraningPlan = () => {
    const [data, setData] = useState('')
    const navigate = useNavigate()
    function getTraningPlan() {
        client.get("/api/main-plan/", 
        {
            headers: {
            'Authorization': `Token ${localStorage.getItem("token")}`,
        }}).then((res) => {
            setData(res.data)
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        getTraningPlan()
      }, []);

    
    function addPlanAction() {
        navigate("/add-plan")
    }

    return (
        <div>
            {data ? (
                <>
                    <h1>Training Plan <br/> {data.name}</h1><hr/>
                    <div>
                        <h3>Exercises</h3>
                        {data.exercises.map(exercise => (
                            <div key={exercise.id}>
                                <h3>{exercise.name}</h3>
                                <p>Category: {exercise.category.name}</p>
                                <p>Description: {exercise.description}</p>
                                <p>Sets: {exercise.sets}</p>
                                <p>Repetitions: {exercise.repetitions}</p>
                            </div>
                        ))}
                    </div><hr/>
                    <h3>Informations <br/></h3><p>{data.informations}</p><hr/>
                    <h3>Date</h3><p>{data.start_date}</p><hr/>
                </>
            ) : (
                <>
                <div>

                    <Button variant="primary" size="lg" onClick={() => addPlanAction()}>
                        Add Traning Plan
                    </Button>{' '}
                </div>
                
                
                </>
            )}
        </div>
    );

} 

export default TraningPlan