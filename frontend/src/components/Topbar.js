import React from 'react'
import logo from '../images/ctc-logoo.jpg'

const Topbar = () => {
    return (

        <div style={{ display: 'flex', alignItems: 'center', gap: "10px", marginBottom: "35px" }}>
            <img src={logo} style={{ width: "140px", height: 'auto' }} />

            <div style={{ width: "70%" }}>
                <h2 style={{ fontSize: '25px', textAlign: 'center', color: 'black' }}>Property and Merchandise Hub Management
                    System with QR Code Tracking of Ceguera Technological Colleges</h2>
            </div>
        </div>
    )
}
export default Topbar
