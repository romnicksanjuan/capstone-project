import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import DOMAIN from "../config/config";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const BarChart = () => {
    const [monthlyData, setMonthlyData] = useState([])


    useEffect(() => {

        const bargraph = async () => {
            try {
                const response = await fetch(`${DOMAIN}/bar-charts`)

                const data = await response.json()
                // const d = data
                console.log(data)
                setMonthlyData(data.monthlyData)
            } catch (error) {
                console.log(error)
            }
        }

        bargraph()
    }, [])


    const data = {
        labels: monthlyData.map((m) => m.month),
        datasets: [
            {
                label: "Monthly Borrowed Data",
                data: monthlyData.map(m => m.count ? m.count : 0),
                backgroundColor: "rgba(255, 165, 0, 0.6)", // Orange with transparency
                borderColor: "rgba(255, 140, 0, 1)", // Darker orange border
                borderWidth: 2,
                borderRadius: 5,
                
                barThickness: 40, // Adjust thickness
            },
        ],
    };
    

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 20, // Adjust dataset label font size
                    }
                }
            },
            tooltip: {
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },
        scales: {
            x: {
                barPercentage: 0.7, // Adjust bar width (default is 0.9)
                categoryPercentage: 0.8, // Adjusts spacing between bars
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20, // Creates lines at 20, 40, 60, 80, 100
                },
                grid: {
                    color: "gray", // Light grid lines
                    drawBorder: false, // Remove border around Y-axis
                },
                min: 0,  // Ensure the scale starts at 0
                max: 100, // Set the maximum value
            }
        }
    };

    return (
        <div style={{ width: "100%", height: "260px", margin: "0",borderRadius:"5px", backgroundColor:'whitesmoke', padding: '10px',  }}>
            <Bar data={data} options={options} style={{ height: "10px",}}/>
        </div>
    );
};

export default BarChart;
