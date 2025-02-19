import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import image from "../images/ctc logo.png"
import DOMAIN from '../config/config'

const PropertyPage = () => {
    const { sn } = useParams()
    const [item, setItem] = useState({})
    console.log(sn)

    useEffect(() => {
        const handleGetItem = async () => {
            const response = await fetch(`${DOMAIN}/item/${sn}`)
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
        <div style={{ zIndex: -1, position: 'relative', width: '100%', height: '100vh', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFDF00' }}>
            <div style={{
                position: 'absolute',
                backgroundImage: `url("${image}")`,
                backgroundSize: 'contain',
                backgroundPosition: 'center', backgroundRepeat: "no-repeat",
                height: '100vh',
                width: '100%',
                opacity: "0.4",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: -1,

            }} >
            </div>
            <div>
                <h2 style={{ fontSize: '50px', color: 'rgb(255, 187, 0)', WebkitTextStroke: "1px black", fontWeight: 'bold', textAlign: 'center', }}>Property of Ceguera Technological Colleges</h2>
                <h4 style={{ color: 'white', fontSize: '35px', WebkitTextStroke: "1px black", textAlign: 'center' }}>Serial Number: {item.serialNumber}</h4>
                <h4 style={{ color: 'white', fontSize: '35px', textAlign: 'center', WebkitTextStroke: "1px black" }}>Unit: {item.unit}</h4>
            </div>
        </div>
    )
}

export default PropertyPage
