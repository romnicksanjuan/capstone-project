import React, { useEffect, useState } from 'react'
import Domain from '../../config/config.js'
import { useNavigate } from "react-router-dom"
import img from '../../images/ctc-logoo.jpg'

const RequesterSignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [department, setDepartment] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [designation, setDesignation] = useState("")
    const [dateOfBirth, setdateOfBirth] = useState(new Date().toISOString().split('T')[0])

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const [depArray, setDepArray] = useState([])


    useEffect(() => {
        const getDepartment = async () => {
            try {
                const response = await fetch(`${Domain}/get-department`, {
                    method: 'GET',
                    credentials: 'include',
                })

                const data = await response.json()

                if (!response.ok) {
                    //  setError()
                    return
                }

                console.log('get-department:', data)
                setDepArray(data)

            } catch (error) {
                console.log(error)
            }
        }

        getDepartment()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${Domain}/requester-register`, {
                method: "POSt",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password, gender, department, phoneNumber, designation, dateOfBirth })
            })

            const data = await response.json()
            if (!response.ok) {
                setErrorMessage(data.message)
                setSuccessMessage("")
                return;
            }
            setSuccessMessage(data.message)
            setErrorMessage("")
            setEmail('')
            setPassword('')
            setDepartment('')
            setGender('')
            setPhoneNumber('')
            setdateOfBirth(new Date())
            setDesignation('')


        } catch (error) {
            console.log(error.message)
        }
    }

    // background-color: rgb(255, 187, 0);
    // useEffect(() => {
    //     setSuccessMessage("")
    //     setErrorMessage("")
    // }, [email, password, department, designation, gender, phoneNumber,])



    return (
        <div style={{ width: '100%', height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "whitesmoke" }}>
            <div style={{ display: 'flex', width: '60%', height: 'auto', backgroundColor: 'rgb(255, 187, 0)', padding: '10px 20px', borderRadius: "5px" }}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                    <img src={img} style={{ width: '50%', height: 'auto' }} />
                </div>

                <form onSubmit={handleSubmit} style={{ width: '50%' }}>
                    <h2 style={{ textAlign: 'center', color: 'white', fontSize: '25px', padding: '0', margin: "0" }}>Sign Up Form</h2>
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
                            type='email'
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

                    <div style={{ width: '100%', }}>
                        <label>Gender:</label><br />
                        <select
                            style={{ padding: '5px' }}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option disabled value="">-- Select Gender --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div style={{ width: '100%', }}>
                        <label>Date Of Birth:</label><br />
                        <input style={{
                            width: '', boxSizing: 'border-box', height: '45px',
                            padding: '2px 5px 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '2px 0', border: 'none'
                        }}
                            value={dateOfBirth}
                            onChange={(e) => setdateOfBirth(e.target.value)}
                            required
                            type='date' placeholder='Enter Password' />
                    </div>

                    <div style={{ width: '100%', }}>
                        <label>Designation:</label><br />
                        <input style={{
                            width: '100%', boxSizing: 'border-box', height: '45px',
                            padding: '2px 5px 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '2px 0', border: 'none'
                        }}
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            type='text' placeholder='Enter Designation' />
                    </div>

                    <div style={{ width: '100%', }}>
                        <label>Department:</label><br />
                        <select id="options" value={department} onChange={(e) => setDepartment(e.target.value)} style={{
                            width: '100%', boxSizing: 'border-box', height: '45px',
                            padding: '2px 5px 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '2px 0', border: 'none'
                        }}>
                            <option value="">--Select Department--</option>
                            {depArray ? depArray.map((dep, index) => (
                                <>
                                    <option value={dep.department}>{dep.department}</option>
                                </>
                            )) : ''}
                        </select>
                    </div>

                    <div style={{ width: '100%', }}>
                        <label>Phone Number:</label><br />
                        <input style={{
                            width: '100%', boxSizing: 'border-box', height: '45px',
                            padding: '2px 5px 2px 5px', fontSize: "14px", borderRadius: '5px', margin: '2px 0', border: 'none'
                        }}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            type='text' placeholder='Enter Phone Number' />
                    </div>

                    <p style={{ padding: '5px 0', margin: '0', fontSize: '1.2rem', color: 'white', cursor: 'pointer', }} onClick={() => navigate('/requester-login')}>
                        Aleady have an Account? <span style={{ color: "blue" }}>Login</span></p>

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

export default RequesterSignUp
