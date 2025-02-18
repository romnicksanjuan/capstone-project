import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PropertyPage = () => {
    const { sn } = useParams()
    const [item, setItem] = useState({})
    console.log(sn)

    useEffect(() => {
        const handleGetItem = async () => {
            const response = await fetch(`http://localhost:3001/item/${sn}`)
            if (!response.ok) {
                console.log("item not found")
                return;
            }

            const data = await response.json()
            setItem(data)
            console.log(data)
        }

        handleGetItem()
    }, [])
    return (
        <div style={{ width: '90%', height: '100vh', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
            <div>
                <h2 style={{ fontSize: '40px', color: 'white', fontWeight: 'bold' }}>Property of Ceguera Technological Colleges</h2>
                <h4 style={{ color: 'white',fontSize:'20px' }}>Unit: {item.unit}</h4>
                <h4 style={{ color: 'white',fontSize:'20px' }}>Serial Number: {item.serialNumber}</h4>
            </div>
        </div>
    )
}

export default PropertyPage
