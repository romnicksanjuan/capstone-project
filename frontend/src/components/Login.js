import React, { useEffect, useState } from 'react'
import Domain from '../config/config'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${Domain}/admin/login`, {
                method: "POSt",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            if (!response.ok) {
                setErrorMessage(data.message)
                setSuccessMessage("")
                return;
            }

            setSuccessMessage(data.message)
            setErrorMessage("")

            navigate("/dashboard")
        } catch (error) {
            console.log(error.message)
        }
    }

    // background-color: rgb(255, 187, 0);
    useEffect(() => {
        setSuccessMessage("")
        setErrorMessage("")
    }, [email, password])

    return (
        <div style={{ width: '100%', height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "whitesmoke" }}>
            <div style={{ width: '500px', height: 'auto', backgroundColor: 'rgb(255, 187, 0)', padding: '1rem 2rem', borderRadius: "5px" }}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'center', color: 'white', fontSize: '25px', padding: '0', margin: "0" }}>Login Form</h2>
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
                        <label>Password:</label><br />
                        <input style={{
                            width: '100%', boxSizing: 'border-box', height: '45px',
                            padding: '2px 5px 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '2px 0', border: 'none'
                        }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type='password' placeholder='Enter Password' />
                    </div>

                    <p style={{padding:'5px 0', margin:'0', fontSize:'1.2rem', color:'black', cursor:'pointer',}} onClick={() => navigate('/forgot-password')}>Forgot Password</p>

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
        </div>
    )
}

export default Login
