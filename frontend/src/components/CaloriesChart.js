import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
); 


const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

const CaloriesChart = () => {
    const [raports, setRaports] = useState([])
    
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

    const chartDataCalories = {
        labels: raports?.map(raport => raport.date),
        datasets: [{
            label: "Calories",
            data: raports?.map(raport => raport.calories),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 3
        }]
    }
    

    const chartDataWeight = {
        labels: raports?.map(raport => raport.date),
        datasets: [{
            label: "Weight",
            data: raports?.map(raport => raport.weight),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 3
        }]
    }

    const chartDataCircuits = {
        labels: raports?.map(raport => raport.date),
        datasets: [
            {
                label: "Chest Circuit",
                data: raports?.map(raport => raport.chest_circuit),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3
            },
            {
                label: "Biceps Circuit",
                data: raports?.map(raport => raport.biceps_circuit),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3
            },
            {
                label: "Waist Circuit",
                data: raports?.map(raport => raport.waist_circuit),
                backgroundColor: 'rgba(93, 249, 0, 0.2)',
                borderColor: 'rgba(93, 249, 0, 1)',
                borderWidth: 3
            },
            {
                label: "Thigh Circuit",
                data: raports?.map(raport => raport.thigh_circuit),
                backgroundColor: 'rgba(93, 59, 161, 0.2)',
                borderColor: 'rgba(93, 59, 161, 1)',
                borderWidth: 3
            },
            {
                label: "Calf Circuit",
                data: raports?.map(raport => raport.calf_circuit),
                backgroundColor: 'rgba(245, 94, 69, 0.2)',
                borderColor: 'rgba(245, 94, 69, 1)',
                borderWidth: 3
            },
        ]
    }

    const optionsKG = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true, 
                title: {
                    display: true,
                    text: '[ KG ]' 
                }
            }
        },
        legend: {
            labels: {
                fontSize: 25,
            },
        }
    };

    const optionsCM = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true, 
                title: {
                    display: true,
                    text: '[ CM ]' 
                }
            }
        },
        legend: {
            labels: {
                fontSize: 25,
            },
        }
    };


    const optionsKCAL = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true, 
                title: {
                    display: true,
                    text: '[ KCAL ]' 
                }
            }
        },
        legend: {
            labels: {
                fontSize: 25,
            },
        }
    };

    return (
        <div>
            <div>
              <Line
                data={chartDataCalories}
                height={400}
                options={optionsKCAL}
        
              />

            </div>
            <div>
            <Line
              data={chartDataWeight}
              height={400}
              options={optionsKG}
            />

            </div>
            <div>
            <Line
              data={chartDataCircuits}
              height={400}
              options={optionsCM}
            />

            </div>
        </div>
      )
}
export default CaloriesChart