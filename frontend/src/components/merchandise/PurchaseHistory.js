import React from 'react'
import Navbar from '../Navbar'
import style from '../../css/Items.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import DOMAIN from '../../config/config'
import Auth from '../auth/Auth'

const token = localStorage.getItem("token")
const PurchaseHistory = () => {
    Auth()
    const [purchaseHistory, setPurChaseHistory] = useState([])

    useEffect(() => {
        const getAllPurchaseHistory = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-purchase-history`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    console.log('Error')
                    return;
                }
                const data = await response.json()
                console.log(data)
                setPurChaseHistory(data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllPurchaseHistory()
    }, [])
    return (
        <>
            <Navbar />
            <div style={{ width: '90%', margin: '0 auto' }}>
                <table className={style.styledTable}>
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
                            <tr key={index}>
                                {/* <td className={style.serialNumber}>{item.number}</td> */}
                                {/* <td className={style.image}>
                                    <img src={item.image.data} style={{ width: '100px', height: '100px' }} />
                                </td> */}
                                <td className={style.image}>
                                    <img src={`data:image/jpeg;base64,${item.merchandise.image.data}`} style={{ width: '100px', height: '100px' }} />
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
        </>
    )
}

export default PurchaseHistory
