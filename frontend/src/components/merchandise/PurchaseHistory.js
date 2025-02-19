import React from 'react'
import Navbar from '../Navbar'
import style from '../../css/Items.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import DOMAIN from '../../config/config'

const PurchaseHistory = () => {
    const [purchaseHistory, setPurChaseHistory] = useState([])

    useEffect(() => {
        const getAllPurchaseHistory = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-purchase-history`)
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
            <div style={{ width: '80%', margin: '0 auto' }}>
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
                                    <img src={item.itemId.image} style={{ width: '100px', height: '100px' }} />
                                </td>
                                 <td>{item.item.itemId.name}</td>
                                 <td>{item.item.itemId.price}</td>
                                <td>{item.item.fullname}</td>
                                <td>{item.item.program}</td>
                                <td>{item.item.size}</td>
                                <td>{item.item.quantity}</td>
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
