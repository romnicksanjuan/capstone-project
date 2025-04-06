import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import Topbar from './Topbar'
// const token = localStorage.getItem("token")

function Settings() {
    const [activeSection, setActiveSection] = useState('profile_information')

    // console.log(activeSection)
    return (
        <div style={{ display: 'flex' }}>
            <Navbar />
            <div className={styles.Dashboard}>

                <Topbar />
                <h2 style={{ color: 'orange', textAlign: 'start', margin: "0 0 10px 0" }}>Settings</h2>


                <div style={{ display: 'flex', width: "100%", height: '65vh', gap: '20px' }}>
                    <nav style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', width: "20%", borderRadius: '5px' }}>
                        <ul style={{ listStyle: 'none', padding: '15px', }}>
                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'profile_information' ? 'white' : 'black',
                                backgroundColor: activeSection === 'profile_information' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('profile_information')}>
                                Profile Information
                            </li>

                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'change_password' ? 'white' : 'black',
                                backgroundColor: activeSection === 'change_password' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('change_password')} >
                                Change Password
                            </li>
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div style={{ backgroundColor: 'white', width: '80%', padding: '20px', borderRadius: '5px', color: '#fff' }}>
                        {activeSection === 'profile_information' &&
                            <div style={{ color: 'black' }}>
                                <h4 style={{ marginBottom: "10px" }}>Email: ctc@gmail.com</h4>
                                <h4 style={{ marginBottom: "10px" }}>Password: ctc</h4>
                                <h4 style={{ marginBottom: "10px" }}>Role: Admin</h4>
                                <h4 style={{ marginBottom: "10px" }}>Back up Email: Secondary@gmail.com</h4>
                            </div>
                        }

                        {activeSection === 'change_password' &&
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', width: '100%', height: '100%' }}>

                                <form style={{ padding: "20px", backgroundColor: 'orange', border: '1px solid black', width: '50%', borderRadius: '5px' }}>
                                    <h2 style={{ textAlign: 'center', color: "white" }}>Change Password</h2>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>Email:</label><br />
                                        <input placeholder="Enter Email"
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',

                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>Old Password:</label><br />
                                        <input placeholder="Old Password"
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',

                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>New Password:</label><br />
                                        <input placeholder="New Password"
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',

                                            }} />
                                    </div>


                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>Confirm Password:</label><br />
                                        <input placeholder="Confirm Password"
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',

                                            }} />
                                    </div>

                                    <button type='submit' style={{  padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none', }}>Submit</button>
                                </form>
                            </div>
                        }
                    </div>
                </div>


            </div>

        </div>

    )
}

export default Settings
