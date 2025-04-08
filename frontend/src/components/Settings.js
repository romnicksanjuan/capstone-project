import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import Topbar from './Topbar'
// const token = localStorage.getItem("token")

function Settings() {
    const [activeSection, setActiveSection] = useState('profile_information')

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassowrd] = useState('')
    const [confirmPassword, setConfirmPassowrd] = useState('')

    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const [role, setRole] = useState(null)

    useEffect(() => {
        const role = localStorage.getItem('role')
        setRole(role)
    }, [])

    // checkToken
    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await fetch(`${DOMAIN}/check-token`, {
                    method: 'get',
                    credentials: 'include'
                })

                const data = await response.json()

                if (!response.ok) {
                    console.log('data:', data)

                    if (data.message === 'Access Denied') {
                        alert("Session Expired, Please Login Again")
                        navigate("/")
                    }
                    return
                }

                console.log('data:', data)
                setUser(data.user)
            } catch (error) {
                console.log(error)
            }
        }

        return () => checkToken()
    }, [])

    // change passowrd
    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (!window.confirm('Change Password Confirmation')) {
            return
        }
        try {
            const response = await fetch(`${DOMAIN}/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ email, oldPassword, newPassword, confirmPassword })
            })

            const data = await response.json()

            if (data.success === false) {
                console.log(data.message)
                setErrorMessage(data.message)
                setSuccessMessage('')
                return
            }
            setSuccessMessage(data.message)
            setErrorMessage('')
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    if (role === null) {
        return null
    }
    // console.log(activeSection)
    return (
        <div style={{ display: 'flex' }}>
            <Navbar />
            <div className={styles.Dashboard}>

                {/* {(role === 'admin' || role === 'dean' || role === 'president') ? <Topbar /> : ''} */}

                <h2 style={{ color: 'orange', textAlign: 'start', margin: "0 0 10px 0" }}>Settings</h2>


                <div style={{ display: 'flex',minHeight:'90%', width: "100%", height: '65vh', gap: '20px' }}>
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
                            <div style={{ display: 'grid', width: '80%', margin: '0 auto' }}>
                                <div style={{ display: 'flex', }}>
                                    <div style={{ width: '30%' }}>
                                        <h4 style={{ marginBottom: "10px", color: 'black' }}>Email:</h4>
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        <p style={{ marginBottom: "10px", color: 'black' }}>{user.email}</p>
                                    </div>
                                </div>


                                <div style={{ display: 'flex', }}>
                                    <div style={{ width: '30%' }}>
                                        <h4 style={{ marginBottom: "10px", color: 'black' }}>Role:</h4>
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        <p style={{ marginBottom: "10px", color: 'black' }}>{user.role}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', }}>
                                    <div style={{ width: '30%' }}>
                                        <h4 style={{ marginBottom: "10px", color: 'black' }}>Back up Email:</h4>
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        <p style={{ marginBottom: "10px", color: 'black' }}>Secondary@gmail.com</p>
                                    </div>
                                </div>

                            </div>
                        }

                        {activeSection === 'change_password' &&
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black', width: '100%', height: '100%' }}>

                                <form onSubmit={handleChangePassword} style={{ padding: "20px", backgroundColor: 'orange', border: '1px solid black', width: '50%', borderRadius: '5px' }}>
                                    {successMessage ? <p style={{ color: 'white', fontSize: '16px', backgroundColor: 'green', padding: "7px 5px", textAlign: 'center', borderRadius: '5px' }}>{successMessage}</p> : ''}
                                    {errorMessage ? <p style={{ color: 'white', fontSize: '16px', backgroundColor: 'red', padding: "7px 5px", textAlign: 'center', borderRadius: '5px' }}>{errorMessage}</p> : ''}
                                    <h2 style={{ textAlign: 'center', color: "white" }}>Change Password</h2>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>Email:</label><br />
                                        <input placeholder="Enter Email"
                                            type='email'
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',

                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>Old Password:</label><br />
                                        <input placeholder="Old Password"
                                            type='text'
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',

                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>New Password:</label><br />
                                        <input
                                            type='password'
                                            required
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassowrd(e.target.value)}
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',

                                            }} />
                                    </div>


                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '17px' }}>Confirm Password:</label><br />
                                        <input
                                            placeholder="Confirm Password"
                                            type='password'
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassowrd(e.target.value)}
                                            style={{
                                                padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none',
                                            }} />
                                    </div>

                                    <button type='submit' style={{ padding: '8px 5px', fontSize: '17px', width: '100%', borderRadius: '5px', border: 'none', }}>Submit</button>
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
