import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import Topbar from './Topbar'
// const token = localStorage.getItem("token")

function RequestItems() {


    return (
        <div style={{ display: 'flex' }}>
            <Navbar />


            <div className={styles.Dashboard}>

                <Topbar />
                <h2 style={{ color: 'orange', textAlign: 'start', margin: "0" }}>Request Items</h2>


                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  
                </div>
               

            </div>

        </div>

    )
}

export default RequestItems
