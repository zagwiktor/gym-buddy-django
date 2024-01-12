import axios from "axios"
import React, { useState, useEffect } from "react"

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})
const TraningPlan = () => {
    const [data, setData] = useState('')
    function getTraningPlan() {
        client.get("/api/main-plan/", 
        {
            headers: {
            'Authorization': `Token ${localStorage.getItem("token")}`,
        }}).then((res) => {
            setData(res.data)
            setExercises(res.data)
        }).catch(error => console.log(error))
    }

    function setExercises(data) {
        const homePlanContainer = document.getElementById("home-traning-plan-exercises");

        data.exercises.forEach(exercise => {
            const exerciseDiv = document.createElement("div")
            exerciseDiv.id = `exercise-${exercise.id}`
            exerciseDiv.innerHTML = `
              <h3>${exercise.name}</h3>
              <p>Category: ${exercise.category.name}</p>
              <p>Description: ${exercise.description}</p>
              <p>Sets: ${exercise.sets}</p>
              <p>Repetitions: ${exercise.repetitions}</p>
            `
            homePlanContainer.appendChild(exerciseDiv);
        })
        
    }

    useEffect(() => {
        getTraningPlan()
      }, []);

    return (
        <div >
            <h1>Traning Plan <br/> {data.name}</h1><hr/>
            <div id="home-traning-plan-exercises"><h3>Exercises</h3></div><hr/>
            
            <h3>Informations <br/></h3><p >{data.informations}</p><hr/>
            <h3>Date</h3><p >{data.start_date}</p><hr/>
        </div>
    )

} 

export default TraningPlan