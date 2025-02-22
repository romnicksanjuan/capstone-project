import React, { useState } from 'react'
import styles from '../css/Navbar.module.css'
import image from '../images/ctc logo.png'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiCollection } from "react-icons/hi";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";


const Navbar = () => {
    return (

        <>
            <nav className={styles.navbar}>
                <div className={styles.navbarLogo}>
                    <img style={{}} src={image} />
                </div>
                <div>
                    <h2 style={{ fontSize: '30px', textAlign: 'center' }}>Property and Merchandise Hub Management
                        System with QR Code Tracking of Ceguera Technological Colleges</h2>
                </div>

                <div style={{ visibility: "hidden" }} className={styles.navbarLogo}>
                    <img src={image} />
                </div>
            </nav>

            <div className={styles.pages}>




                <ul className={styles.navbarLinks}>
                    <li>
                        <a style={{ display: 'flex', alignItems: 'center' }} href="/">
                            < RiDashboardHorizontalFill
                                size={30}
                                className='icon'
                            />
                            <p>  Dashboard</p>
                        </a></li>
                    <li><a style={{ display: 'flex', alignItems: 'center' }} href="/items">
                        <IoIosListBox size={30} className='icon' />
                        <p>Inventory</p>
                    </a></li>
                    <li><a style={{ display: 'flex', alignItems: 'center' }} href="/borrowed-items">
                        <HiCollection size={30}className='icon' />
                        <p>Borrowed-Items</p>
                    </a></li>
                    <li><a style={{ display: 'flex', alignItems: 'center' }} href="/history">
                        <RiChatHistoryFill size={30} className='icon' />
                        <p>History</p>
                    </a></li>
                    <li><a style={{ display: 'flex', alignItems: 'center' }} href="/merchandise">
                        <FaShoppingBag size={29} className='icon' />
                        <p>Merchandise</p>

                    </a></li>
                    <li><a style={{ display: 'flex', alignItems: 'center' }} href="/get-purchase-history">
                        <RiChatHistoryFill size={30} className='icon' />
                        <p> Purchase History</p>
                    </a></li>
                </ul>
            </div>

        </>


    )
}

export default Navbar
