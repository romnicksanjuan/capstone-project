import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../css/ReturnedItems.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import TopBar from "./Topbar"

const token = localStorage.getItem("token")

const ReturnedItems = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchBorrowedItems = async () => {
            const response = await fetch(`${DOMAIN}/fetch-history`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.statusText === "Unauthorized") {
                // console.log("hayop ka",response.statusText)
                alert("Session Expired, Please Login Again")
                navigate("/")
                return
            }

            const data = await response.json()
            console.log("debugging", data)
            setData(data)
        }

        fetchBorrowedItems()
    }, [])

    // navigate to history details
    const historyDetails = (item) =>{
        navigate('/borrowed-transaction-details', {state: item})
    }
    
    return (
        <div style={{display:'flex'}}>
            <Navbar />
            <div className={styles.history}>

                <TopBar />
                
                <h2 style={{ color: "orange", padding:'10px 0' }}>Returned Items</h2>
                <table className={styles.styledTable}>
                    <thead>
                        <tr>
                            {/* <th>Serial No.</th> */}
                            <th>Serial Number</th>
                            <th>Unit</th>
                            <th>Brand</th>
                            <th>Borrower's Name</th>
                            <th>Mobile Number</th>
                            <th>Date Borrowed</th>
                            <th>Date Returned</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr onClick={() => historyDetails(item)} key={index}>
                                {/* <td className={styles.serialNumber}>{item.number}</td> */}
                                <td>{item.serialNumber}</td>
                                <td>{item.item.unit}</td>
                                <td>{item.item.brand}</td>
                                <td>{item.borrower}</td>
                                <td>{item.mobileNumber}</td>
                                <td>{item.dateBorrowed}</td>
                                <td>{item.dateReturned}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReturnedItems
