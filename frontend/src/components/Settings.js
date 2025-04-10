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


    // settings 
    useEffect(() => {
        const settingsFunc = async () => {
            try {
                const response = await fetch(`${DOMAIN}/settings`, {
                    method: 'GET',
                    credentials: 'include'
                })

                const data = await response.json()

                if (!response.ok) {
                    return console.log(response.statusText)
                }
                console.log(data)
                setUser(data.user)
            } catch (error) {
                console.log(error)
            }
        }


        settingsFunc()
    },[])

  

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


                <div style={{ display: 'flex', minHeight: '90%', width: "100%", height: '65vh', gap: '20px', }}>
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
                    <div style={{ backgroundColor: 'white', width: '80%', padding: '20px', borderRadius: '5px', color: '#fff', display: 'flex', justifyContent: 'center' }}>
                        {activeSection === 'profile_information' &&
                            <div style={{ display: 'flex', justifyContent: 'center', width: '80%', margin: '0 auto', }}>
                                <div style={{ width: '80%', margin: '0 auto', backgroundColor: 'orange', padding: '15px', borderRadius: '2px' }}>
                                    <h3 style={{ marginBottom: '20px', color: 'black' }}>Profile Information</h3>
                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%', }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Email:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.email}</p>
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Role:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.role}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Gender:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.gender}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Date of Birth:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.dateOfBirth}</p>
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Department:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.department}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Designation:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.designation}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Phone Number:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.phoneNumber}</p>
                                        </div>
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
