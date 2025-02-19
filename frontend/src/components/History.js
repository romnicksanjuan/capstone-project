import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../css/History.module.css'
import DOMAIN from '../config/config'
const History = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchBorrowedItems = async () => {
            const response = await fetch(`${DOMAIN}/fetch-history`, {
                method: 'GET'
            })

            const data = await response.json()
            console.log(data)
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
                                <td>{item.unit}</td>
                                <td>{item.brand}</td>
                                <td>{item.borrower}</td>
                                <td>{item.mobileNumber}</td>
                                <td>{item.purpose}</td>
                                <td>{item.status}</td>
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
