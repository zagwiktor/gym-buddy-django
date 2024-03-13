import axios from "axios";
import Navbar from "../components/UserNavbar";
import { useEffect, useState } from "react";



const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  })


const Raports = () => {
    const [raport, setRaports] = useState(null)

    function getRaports() {
        client.get('/api/raports-list/', {
            headers : {
                'Authorization': `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setRaports(res.data))
        .catch(error=>console.log(error))
    }
    useEffect(() => {
        getRaports() 
    },[])
    
    return (
        <>
        <Navbar/>
        
        {raport ? (
            raport.map(element => (
                <div key={element.id}>
                    <h4>Raport</h4>
                    <h1>{element.date}</h1>
                    <hr/>
                    <h4>Weight:</h4>
                    <h2>{element.weight}</h2>
                    <hr/>
                    <h4>Biceps circuit:</h4>
                    <h2>{element.biceps_circuit}</h2>
                    <hr/>
                    <h4>Calories:</h4>
                    <h2>{element.date}</h2>
                    <hr/>
                    <h4>Chest circuit:</h4>
                    <h2>{element.chest_circuit}</h2>
                    <hr/>
                    <h4>Thigh circuit:</h4>
                    <h2>{element.thigh_circuit}</h2>
                    <hr/>
                    <h4>Waist circuit:</h4>
                    <h2>{element.waist_circuit}</h2>
                    <hr/>
                    <h4>Calf circuit:</h4>
                    <h2>{element.date}</h2>
                    <hr/>
                </div>
            ))
        ) : (
            <p>You have not added any raport</p>
        )}
        </>
    )
    }

export default Raports