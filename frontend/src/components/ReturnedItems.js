import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar'
import styles from '../css/ReturnedItems.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";
import { RiPrinterFill } from "react-icons/ri";
import TopBar from "./Topbar"
import img from '../images/ctc-logoo.jpg'

const token = localStorage.getItem("token")

const ReturnedItems = () => {
    const contentRef = useRef()
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
    const historyDetails = (item) => {
        navigate('/borrowed-transaction-details', { state: item })
    }

    // printer
    const reactToPrintFn = useReactToPrint({
        documentTitle: `${new Date()}`,
        contentRef: contentRef,
    });

    return (
        <div style={{ display: 'flex' }}>
            <Navbar />
            <div className={styles.history}>

                <TopBar />

                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                    <h2 style={{ color: "orange", padding: '10px 0' }}>Returned Items</h2>
                    <div style={{ marginRight: '10px' }}>
                        <RiPrinterFill onClick={() => reactToPrintFn()} color='black' size={35} />
                    </div>
                </div>

                <div ref={contentRef}>
                    <div className={styles.header}>
                        <img src={img} width={100} height={100} />
                        <h4>Ceguera Technological Colleges</h4>
                    </div>
                    <table className={styles.styledTable}>
                        <thead>
                            <tr>
                                {/* <th>Serial No.</th> */}
                                {/* <th>PMS Number</th>
                                <th>Unit</th> */}
                                {/* <th>Brand</th> */}
                                <th>Borrower's Name</th>
                                <th>Department</th>
                                <th>Purpose</th>
                                <th>Mobile Number</th>
                                <th>Date Borrowed</th>
                                <th>Date Returned</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr onClick={() => historyDetails(item)} key={index}>
                                    {/* <td>{item.serialNumber}</td> */}
                                    {/* <td>{item.item.unit}</td> */}
                                    {/* <td>{item.item.brand}</td> */}
                                    <td>{item.borrower}</td>
                                    <td>{item.department}</td>
                                    <td>{item.purpose}</td>
                                    <td>{item.mobileNumber}</td>
                                    <td>{item.dateBorrowed}</td>
                                    <td>{item.dateReturned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReturnedItems
