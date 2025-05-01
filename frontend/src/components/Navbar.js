import styles from '../css/Navbar.module.css'
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HiCollection } from "react-icons/hi";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaCodePullRequest } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import DOMAIN from '../config/config';
import { useEffect, useState } from 'react';
import { BiSolidReport } from "react-icons/bi";
const Navbar = () => {

    const location = useLocation();

    const isRequestPage = location.pathname === '/request-items';

    //   console.log("isRequestPage", isRequestPage)

    const [role, setRole] = useState(null)
    const [count, setCount] = useState(null)
    const [isClick, setIsclick] = useState(false)
    const navigate = useNavigate()
    const handleLogout = async () => {
        if (!window.confirm("Do you want to logout?")) return

        const response = await fetch(`${DOMAIN}/logout`, {
            method: "POST",
            credentials: "include"
        })

        const data = await response.json()
        // console.log(data.message)
        navigate('/')
    }

    // request count display
    useEffect(() => {
        const count = async () => {
            const response = await fetch(`${DOMAIN}/display-request-count`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content_Type": "application/json"
                }
            })

            if (!response.ok) {
                console.log(response.statusText)
                return
            }
            const data = await response.json()
            // console.log(data)
            setCount(data.requestCountDocument)
        }

        count()
    }, [])


    // check role 
    useEffect(() => {
        const checkRole = async () => {
            const role = localStorage.getItem('role')
            setRole(role)
        }
        checkRole()
    }, [])

    if (role === null) return null;

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

                    {/* admin */}
                    {role === 'admin' &&

                        <>
                            <Link
                                to={"/Dashboard"}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                < RiDashboardHorizontalFill
                                    size={26}
                                    className='icon'
                                />
                                <p style={{ padding: '0' }}>  Dashboard</p>
                            </Link>

                            <Link
                                to={"/inventory"}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <IoIosListBox size={26} className='icon' />
                                <p style={{ padding: '0' }}>Inventory</p>
                            </Link>
                            <Link
                                to={"/borrowed-items"}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <HiCollection size={26} className='icon' />
                                <p style={{ padding: '0' }}>Borrowed Items</p>
                            </Link>
                            <Link
                                to={"/returned-items"}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <RiChatHistoryFill size={26} className='icon' />
                                <p style={{ padding: '0' }}>Returned Items</p>
                            </Link>
                            <Link
                                to={"/merchandise"}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FaShoppingBag size={26} className='icon' />
                                <p style={{ padding: '0' }}>Merchandise</p>

                            </Link>
                            <Link
                                to={"/get-purchase-history"}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <RiChatHistoryFill size={26} className='icon' />
                                <p style={{ padding: '0' }}> Purchase History</p>
                            </Link>

                            <Link
                                to={'/request-items'}
                                onClick={() => setIsclick(!isClick)}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                                <FaCodePullRequest size={26} className='icon' />
                                <p style={{ padding: '0' }}> Request Items</p>
                                {!isRequestPage && count > 0 && !isClick && (
                                    <p style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'red', padding: '2px 6px', borderRadius: '10px' }}>
                                        {count}
                                    </p>
                                )}
                            </Link>

                            <Link
                                to={'/user-list'}
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                                <FaUserAlt size={26} className='icon' />
                                <p style={{ padding: '0' }}> User List</p>
                            </Link>

                            <Link
                                to={'/reports'}
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                                <BiSolidReport size={26} className='icon' />
                                <p style={{ padding: '0' }}> Reports</p>
                            </Link>

                            <Link
                                to={'/settings'}
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                                <IoSettings size={26} className='icon' />
                                <p style={{ padding: '0' }}> Settings</p>
                            </Link>


                            <Link style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }} onClick={() => handleLogout()}>
                                <IoLogOut size={26} className='icon' />
                                <p style={{ padding: '0' }}> Logout</p>
                            </Link>
                        </>


                    }


                    {role === 'dean' || role === 'president' ?
                        <>
                            <Link
                                to={'/request-items'}
                                onClick={() => setIsclick(!isClick)}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                                <FaCodePullRequest size={26} className='icon' />
                                <p style={{ padding: '0' }}> Request Items</p>
                                {!isRequestPage && count > 0 && !isClick && (
                                    <p style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'red', padding: '2px 6px', borderRadius: '10px' }}>
                                        {count}
                                    </p>
                                )}
                            </Link>
                            <Link style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }} onClick={() => handleLogout()}>
                                <IoLogOut size={26} className='icon' />
                                <p style={{ padding: '0' }}> Logout</p>
                            </Link>
                        </>

                        : ''
                    }



                    {/* requester */}
                    {role === 'requester' &&
                        <>
                            <Link
                                to={'/request-items'}
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }} >
                                <FaCodePullRequest size={26} className='icon' />
                                <p style={{ padding: '0' }}> Request Items</p>
                            </Link>

                            <Link
                                to={'/settings'}
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                                <IoSettings size={26} className='icon' />
                                <p style={{ padding: '0' }}> Settings</p>
                            </Link>


                            <Link style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }} onClick={() => handleLogout()}>
                                <IoLogOut size={26} className='icon' />
                                <p style={{ padding: '0' }}> Logout</p>
                            </Link>
                        </>
                    }


                </nav>
            </div>

        </>


    )
}

export default Navbar
