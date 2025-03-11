import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../css/History.module.css'
import DOMAIN from '../config/config'
import Auth from './auth/Auth'

const token = localStorage.getItem("token")

const History = () => {
    Auth()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchBorrowedItems = async () => {
            const response = await fetch(`${DOMAIN}/fetch-history`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await response.json()
            console.log("debugging", data)
            setData(data)
        }

        fetchBorrowedItems()
    }, [])
    return (
        <>
            <Navbar />
            <div className={styles.history}>
                <table className={styles.styledTable}>
                    <thead>
                        <tr>
                            {/* <th>Serial No.</th> */}
                            <th>Serial Number</th>
                            <th>Unit</th>
                            <th>Brand</th>
                            <th>Borrower</th>
                            <th>Mobile Number</th>
                            <th>Purpose</th>
                            <th>Status</th>
                            <th>Date Borrowed</th>
                            <th>Date Returned</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {/* <td className={styles.serialNumber}>{item.number}</td> */}
                                <td>{item.serialNumber}</td>
                                <td>{item.item.unit}</td>
                                <td>{item.item.brand}</td>
                                <td>{item.borrower}</td>
                                <td>{item.mobileNumber}</td>
                                <td>{item.purpose}</td>
                                <td>{item.item.status}</td>
                                <td>{item.dateBorrowed}</td>
                                <td>{item.dateReturned}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default History
