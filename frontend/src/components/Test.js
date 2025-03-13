import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define all months
const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Get the current month (0 = January, 1 = February, etc.)
const currentMonthIndex = new Date().getMonth();
// console.log("index:", currentMonthIndex)

const getThisYearRecords = async () => {
    const current = new Date().getMonth()

    const startOfYear = new Date(new Date().getFullYear(), current, 1);
    console.log("start: ", startOfYear)

    const currentMonth = new Date().getMonth() + 1
    console.log("currentMonth: ", currentMonth)

    const getFullYear = new Date().getFullYear()
    console.log("getFullYear: ", getFullYear)


    let months = [];

    for (let month = 0; month <= currentMonth - 1; month++) {
        console.log("i", month)
      months.push(new Date(2025, month, 1)); // Push start of each month
    }

    console.log("months: ", months)



    for (let i = 0; i < months.length; i++) {
        const startOfMonth = months[i]
         console.log(`${startOfMonth.toLocaleString("default", { month: "long" })}`)


         const startOfNextMonth = i + 1 < months.length ? months[i + 1] : new Date(2025, new Date().getMonth() + 1, 1);
         console.log("startOf", startOfNextMonth)
      }
   
    // const result = await MonthModel.find({
    //     createdAt: { $gte: startOfYear }
    // });

    // console.log("Documents from this year:", result);
};

// getThisYearRecords();
const months = allMonths.slice(0, currentMonthIndex + 1); // Only include up to current month

// Generate random data only for available months
const monthlyData = Array.from({ length: months.length }, () => Math.floor(Math.random() * 500) + 100); // Values between 100-600

const MonthlyBarChart = () => {
    const data = {
        labels: months,
        datasets: [
            {
                label: "Monthly Data",
                data: monthlyData,
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Green
                borderColor: "rgba(75, 192, 192, 1)",
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
            },
            tooltip: {
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#666",
                },
            },
            y: {
                grid: {
                    color: "#ddd",
                    borderDash: [5, 5],
                },
                ticks: {
                    color: "#666",
                    stepSize: 100, // Adjust step size for better readability
                },
            },
        },
    };

    return (
        <div style={{ width: "80%", height: "400px", margin: "auto" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default MonthlyBarChart;
