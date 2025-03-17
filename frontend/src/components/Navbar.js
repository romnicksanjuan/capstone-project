import styles from '../css/Navbar.module.css'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiCollection } from "react-icons/hi";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import DOMAIN from '../config/config';
const Navbar = () => {

    const navigate = useNavigate()
    const handleLogout = async () => {
        if (!window.confirm("Do you want to logout?")) return

        const response = await fetch(`${DOMAIN}/logout`, {
            method: "POST",
            credentials: "include"
        })

        const data = await response.json()
        console.log(data.message)
        navigate('/')
    }
    return (
        <>
            {/* <nav className={styles.navbar}>
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
            </nav> */}

            <div className={styles.pages}>
                <nav className={styles.navbarLinks}>
                    <a style={{ display: 'flex', alignItems: 'center' }} href="/Dashboard">
                        < RiDashboardHorizontalFill
                            size={26}
                            className='icon'
                        />
                        <p style={{ padding: '0' }}>  Dashboard</p>
                    </a>

                    <a style={{ display: 'flex', alignItems: 'center' }} href="/items">
                        <IoIosListBox size={26} className='icon' />
                        <p style={{ padding: '0' }}>Inventory</p>
                    </a>
                    <a style={{ display: 'flex', alignItems: 'center' }} href="/borrowed-items">
                        <HiCollection size={26} className='icon' />
                        <p style={{ padding: '0' }}>Borrowed-Items</p>
                    </a>
                    <a style={{ display: 'flex', alignItems: 'center' }} href="/history">
                        <RiChatHistoryFill size={26} className='icon' />
                        <p style={{ padding: '0' }}>History</p>
                    </a>
                    <a style={{ display: 'flex', alignItems: 'center' }} href="/merchandise">
                        <FaShoppingBag size={26} className='icon' />
                        <p style={{ padding: '0' }}>Merchandise</p>

                    </a>
                    <a style={{ display: 'flex', alignItems: 'center' }} href="/get-purchase-history">
                        <RiChatHistoryFill size={26} className='icon' />
                        <p style={{ padding: '0' }}> Purchase History</p>
                    </a>


                    <a style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleLogout()}>
                        <IoLogOut size={26} className='icon' />
                        <p style={{ padding: '0' }}> Logout</p>
                    </a>
                </nav>
            </div>

        </>


    )
}

export default Navbar
