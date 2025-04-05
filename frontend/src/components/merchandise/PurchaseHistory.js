import React, { useRef } from 'react'
import Navbar from '../Navbar'
import style from '../../css/Items.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import DOMAIN from '../../config/config'
import { useNavigate } from 'react-router-dom'
import Topbar from '../Topbar'
import { useReactToPrint } from "react-to-print";
import { RiPrinterFill } from "react-icons/ri";

const token = localStorage.getItem("token")
const PurchaseHistory = () => {
    const contentRef = useRef()
    const navigate = useNavigate()
    const [purchaseHistory, setPurChaseHistory] = useState([])
    const [originalHistory, setOriginalHistory] = useState([])
    const [display, setDisplay] = useState('All')

    useEffect(() => {
        const getAllPurchaseHistory = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-purchase-history`, {
                    method: "GET",
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

                if (!response.ok) {
                    console.log('Error')
                    console.log(response.statusText)
                    return;
                }
                const data = await response.json()
                console.log(data)
                setOriginalHistory(data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllPurchaseHistory()
    }, [])


    // navigate to purchase history details
    const historyDetails = (item) => {
        navigate('/purchase-transaction-details', { state: item })
    }


    console.log('size', display)

    useEffect(() => {
        const displayBySize = () => {
            if (display === "All") {
                setPurChaseHistory(originalHistory)
            } else {
                setPurChaseHistory(originalHistory.filter(original => original.size.toLowerCase().includes(display.toLowerCase())))
            }
        }
        displayBySize()
    }, [display])

    useEffect(() => {
        const displayBySize = () => {
            setPurChaseHistory(originalHistory)
        }
        displayBySize()
    }, [originalHistory])

    // printer
    const reactToPrintFn = useReactToPrint({
        documentTitle: `${new Date()}`,
        contentRef: contentRef,
    });
    return (
        < div style={{ display: 'flex' }}>
            <Navbar />
            <div style={{ width: '100%', margin: '0 auto', padding: '20px' }}>
                <Topbar />
                <h2 style={{ color: "orange", padding: '10px 0' }}>Purchase History</h2>

                <div style={{display:'flex',gap:'90px'}}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '120px', }}>
                        <select
                            value={display}
                            onChange={(e) => setDisplay(e.target.value)}
                            style={{ padding: '5px', fontSize: '17px' }}
                        >
                            <option value='All' >-- Select Category --</option>
                            <option value='Extra Small'>Extra Small</option>
                            <option value='Small'>Small</option>
                            <option value='Medium'>Medium</option>
                            <option value='Large'>Large</option>
                            <option value='Extra Large'>Extra Large</option>
                            <option value='2XL'>2XL</option>
                        </select>
                    </div>

                    <div style={{marginRight:'10px'}}>
                        <RiPrinterFill onClick={() => reactToPrintFn()} color='black' size={35} />
                    </div>
                </div>
                <table className={style.styledTable} ref={contentRef}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Merchandise Name</th>
                            <th>Price</th>
                            <th>Full Name</th>
                            <th>Program</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Date Purchase</th>

                        </tr>
                    </thead>


                    <tbody>
                        {/* {data.map((item, index) => (
                                         <tr key={index}> */}
                        {purchaseHistory.map((item, index) => (
                            <tr key={index} onClick={() => historyDetails(item)}>
                                {/* <td className={style.serialNumber}>{item.number}</td> */}
                                {/* <td className={style.image}>
                                    <img src={item.image.data} style={{ width: '100px', height: '100px' }} />
                                </td> */}
                                <td className={style.image}>
                                    <img src={`data:image/jpeg;base64,${item.merchandise.image.data}`} style={{ width: '70px', height: '70px' }} />
                                </td>
                                <td>{item.merchandise.name}</td>
                                <td>{item.merchandise.price}</td>
                                <td>{item.fullname}</td>
                                <td>{item.program}</td>
                                <td>{item.size}</td>
                                <td>{item.quantity}</td>
                                <td>{item.purchaseDate}</td>
                            </tr>
                        ))}
                        {/* ))} */}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default PurchaseHistory
