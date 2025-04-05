import React, { useEffect, useState } from 'react'
import Domain from '../config/config'
import { useNavigate } from "react-router-dom"

const token = localStorage.getItem("token")
const ForgotPassword = () => {
    const [steps, setSteps] = useState(1)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [otp, setOTP] = useState('')

    // console.log("vovo",errorMessage)

    // send otp
    const sendOTP = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${Domain}/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            if (!response.ok) {
                console.log(response.statusText)
                return
            }
            const data = await response.json()
            console.log(data)
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    // verify OTP
    const verifyOTP = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${Domain}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, otp })
            })
            const data = await response.json()
            if (!response.ok) {
                console.log(response.statusText)
                alert(data.message)
                return
            }
          
            console.log(data)
            alert(data.message)

            setSteps(2)
        } catch (error) {
            console.log(error)
        }
    }

    // reset password
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${Domain}/admin/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email, newPassword, confirmPassword })
            })
            const data = await response.json()

            if (!response.ok) {
                console.log(data)
                setErrorMessage(data.message)
                setSuccessMessage("")
                return;
            }

            setSuccessMessage(data.message)
            setErrorMessage("")

        } catch (error) {
            console.log(error.message)
        }
    }

    // background-color: rgb(255, 187, 0);
    useEffect(() => {
        setSuccessMessage("")
        setErrorMessage("")
    }, [email, newPassword, confirmPassword])

    return (
        <div style={{ width: '100%', height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "whitesmoke" }}>

            {/* step 1 */}
            {steps === 1 &&
                <div style={{ width: '500px', height: 'auto', backgroundColor: 'rgb(255, 187, 0)', padding: '1rem 2rem', borderRadius: "5px" }}>
                    <form style={{ marginBottom: '20px' }} onSubmit={sendOTP}>
                        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '25px', padding: '0', margin: "0" }}>Send OTP</h2>

                        {errorMessage ? <p style={{
                            color: 'white', backgroundColor: "red", padding: "8px", textAlign: 'center',
                            fontSize: '1.1rem', borderRadius: '5px'
                        }}>{errorMessage}</p> : ""}

                        {successMessage ? <p style={{
                            color: 'white', backgroundColor: "green", padding: "8px", textAlign: 'center',
                            fontSize: '1.1rem', borderRadius: '5px'
                        }}>{successMessage}</p> : ""}

                        <div>
                            <label>Email:</label> <br />
                            <input style={{
                                width: '100%', boxSizing: 'border-box', height: '45px',
                                padding: '2px 0 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '4px 0', border: 'none',
                            }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type='text'
                                placeholder='Enter Email' />
                        </div>

                        <div style={{ width: '100%', display: 'grid' }}>
                            <button style={{
                                backgroundColor: "#219ebc",
                                color: "white", height: "40px",
                                marginTop: "10px", fontSize: "1rem",
                                borderRadius: '5px', border: 'none',
                                cursor: 'pointer'
                            }} type='submit'>Send OTP</button>
                        </div>

                    </form>


                    {/* verify otp */}
                    <form onSubmit={verifyOTP}>
                        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '25px', padding: '0', margin: "0" }}>Verify OTP</h2>

                        {errorMessage ? <p style={{
                            color: 'white', backgroundColor: "red", padding: "8px", textAlign: 'center',
                            fontSize: '1.1rem', borderRadius: '5px'
                        }}>{errorMessage}</p> : ""}

                        {successMessage ? <p style={{
                            color: 'white', backgroundColor: "green", padding: "8px", textAlign: 'center',
                            fontSize: '1.1rem', borderRadius: '5px'
                        }}>{successMessage}</p> : ""}

                        <div>
                            <label>OTP:</label> <br />
                            <input style={{
                                width: '100%', boxSizing: 'border-box', height: '45px',
                                padding: '2px 0 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '4px 0', border: 'none',
                            }}
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}
                                required
                                type='text'
                                placeholder='Enter OTP' />
                        </div>

                        <div style={{ width: '100%', display: 'grid' }}>
                            <button style={{
                                backgroundColor: "#219ebc",
                                color: "white", height: "40px",
                                marginTop: "10px", fontSize: "1rem",
                                borderRadius: '5px', border: 'none',
                                cursor: 'pointer'
                            }} type='submit'>Verify OTP</button>
                        </div>

                    </form>
                </div>

            }


            {/* step 3 */}
            {steps === 2 &&
                <div style={{ width: '500px', height: 'auto', backgroundColor: 'rgb(255, 187, 0)', padding: '1rem 2rem', borderRadius: "5px" }}>
                    <form onSubmit={handleSubmit}>
                        <h2 style={{ textAlign: 'center', color: 'white', fontSize: '25px', padding: '0', margin: "0" }}>Reset Password</h2>

                        {errorMessage ? <p style={{
                            color: 'white', backgroundColor: "red", padding: "8px", textAlign: 'center',
                            fontSize: '1.1rem', borderRadius: '5px'
                        }}>{errorMessage}</p> : ""}

                        {successMessage ? <p style={{
                            color: 'white', backgroundColor: "green", padding: "8px", textAlign: 'center',
                            fontSize: '1.1rem', borderRadius: '5px'
                        }}>{successMessage}</p> : ""}

                        <div>
                            <label>Email:</label> <br />
                            <input style={{
                                width: '100%', boxSizing: 'border-box', height: '45px',
                                padding: '2px 0 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '4px 0', border: 'none',
                            }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type='text'
                                placeholder='Enter Email' />
                        </div>

                        <div style={{ width: '100%', }}>
                            <label>New Password:</label><br />
                            <input style={{
                                width: '100%', boxSizing: 'border-box', height: '45px',
                                padding: '2px 5px 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '2px 0', border: 'none'
                            }}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                type='password' placeholder='New Password' />
                        </div>

                        <div style={{ width: '100%', }}>
                            <label>Confirm Password:</label><br />
                            <input style={{
                                width: '100%', boxSizing: 'border-box', height: '45px',
                                padding: '2px 5px 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '2px 0', border: 'none'
                            }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                type='password' placeholder='Confirm Password' />
                        </div>

                        <p style={{padding:'5px 0', margin:'0', fontSize:'1.2rem', color:'black', cursor:'pointer',}} onClick={() => navigate('/')}>Login your account</p>

                        <div style={{ width: '100%', display: 'grid' }}>
                            <button style={{
                                backgroundColor: "#219ebc",
                                color: "white", height: "40px",
                                marginTop: "10px", fontSize: "1rem",
                                borderRadius: '5px', border: 'none',
                                cursor: 'pointer'
                            }} type='submit'>Submit</button>
                        </div>

                    </form>
                </div>
            }
        </div>
    )
}

export default ForgotPassword
