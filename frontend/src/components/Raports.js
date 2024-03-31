import axios from "axios";
import Navbar from "../components/UserNavbar";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import CaloriesChart from "./CaloriesChart";
import Dropdown from 'react-bootstrap/Dropdown'
import "../style/Raports.css";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  })


const Raports = () => {
    const [raports, setRaports] = useState(null)
    const [chartsVisable, setChartsVisable] = useState(false)
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
    useEffect(() => {
        getRaports() 
    },[])

    function chosenRaport(raport) {
        setShoosedRaport(raport)
        setCalories(raport.calories)
        setWeight(raport.weight)
        setChestCircuit(raport.chest_circuit)
        setBicepsCircuit(raport.biceps_circuit)
        setWaistCircuit(raport.waist_circuit)
        setThighCircuit(raport.thigh_circuit)
        setCalfCircuit(raport.calf_circuit)
    }
    
    return (
        <>
            
            <Navbar/>
            <div className="raports-charts-container">
            <div className="raport-container">
                <Dropdown data-bs-theme="dark" style={{marginBottom: "12px"}}>
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
    
            <div>
                <h4>Raport</h4>
                {choosedRaport ? <h1>{choosedRaport.date}</h1> : null}
                <hr/>
                <h4>Weight:</h4>
                <h2>{weight}</h2>
                <hr/>
                <h4>Biceps circuit:</h4>
                <h2>{bicepsCircuit}</h2>
                <hr/>
                <h4>Calories:</h4>
                <h2>{calories}</h2>
                <hr/>
                <h4>Chest circuit:</h4>
                <h2>{chestCircuit}</h2>
                <hr/>
                <h4>Thigh circuit:</h4>
                <h2>{thighCircuit}</h2>
                <hr/>
                <h4>Waist circuit:</h4>
                <h2>{waistCircuit}</h2>
                <hr/>
                <h4>Calf circuit:</h4>
                <h2>{calfCircuit}</h2>
                <hr/>                
            </div>
            {raports  ? (
            <Button variant="secondary" style={{marginTop: "12px"}} onClick={() => {setChartsVisable(!chartsVisable)}}>
                {chartsVisable ? ("Hide charts of progress") : ("Show charts of progress" )}
            </Button>) : (null)}
            </div>
            {chartsVisable ? (
                <div className="charts-container">
                {chartsVisable?<div className="single-chart-container"><CaloriesChart/></div>:null}
                </div>
            ) : (
                <div className="logo-container">
                <img src="/GBlogo.png" alt="GB Logo" className="logo-raports" /> 
                </div>
            )}
            
            </div>
            
        </>
        
    );
}
export default Raports