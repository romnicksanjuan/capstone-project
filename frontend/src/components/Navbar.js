import React from 'react'
import styles from '../css/Navbar.module.css'
import image from '../images/logo.png'

const Navbar = () => {
    return (

        <>
            <nav className={styles.navbar}>
                <div className={styles.navbarLogo}>
                    <img src={image} />
                </div>
                <div>
                    <h2 style={{ fontSize: '30px', textAlign:'center' }}>Property and Merchandise Hub Management
                        System with QR Code Tracking of Ceguera Technological Colleges</h2>
                </div>

                <div className={styles.navbarLogo}>
                    <img src={image} />
                </div>
            </nav>

            <div className={styles.pages}>

            


                <ul className={styles.navbarLinks}>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/items">Items</a></li>
                    <li><a href="/borrowed-items">Borrowed-Items</a></li>
                    <li><a href="/history">History</a></li>
                    <li><a href="/merchandise">Merchandise</a></li>
                    <li><a href="/get-purchase-history">Purchase History</a></li>
                </ul>
            </div>

        </>


    )
}

export default Navbar
