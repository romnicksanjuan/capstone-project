import React, { useEffect, useState } from 'react'
import DOMAIN from '../../config/config'
import { MdDelete } from "react-icons/md";

const DepartmentPage = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [department, setDepartment] = useState('')
    const [depArray, setDepArray] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${DOMAIN}/create-department`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ department })
            })

            const data = await response.json()

            if (!response.ok) {
                alert(response.statusText)
            }

            // setMessage(data.message)
            // setError('')
            alert(data.message)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-department`, {
                    method: 'GET',
                    credentials: 'include',
                })

                const data = await response.json()

                if (!response.ok) {
                    setError()
                }

                console.log(data)
                setDepArray(data)

            } catch (error) {
                console.log(error)
            }
        }

        getDepartment()
    }, [])

    const handleDel = async(id) => {

        console.log(id)
       if (!window.confirm('Do You want do delete this Department?')) {
        return
       }
        try {
            const response = await fetch(`${DOMAIN}/delete-department/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            const data = await response.json()

            if (!response.ok) {
                setError()
            }

            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: 'orange',
                    padding: '5px',
                    borderRadius: '8px',
                    // maxWidth: '400px',
                    margin: '20px auto',
                    display: 'flex',
                    // flexDirection: 'column',
                    gap: '10px'
                }}
            >
                {message && (
                    <p
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            textAlign: 'center',
                            backgroundColor: 'green'
                        }}
                    >
                        {message}
                    </p>
                )}

                {error && (
                    <p
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            textAlign: 'center',
                            backgroundColor: 'red'
                        }}
                    >
                        {error}
                    </p>
                )}

                <label htmlFor="department" style={{ fontWeight: 'bold' }}>
                    Department Name:
                </label>
                <input
                    placeholder='Enter Department'
                    type="text"
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    style={{
                        padding: '3px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Add Department
                </button>
            </form>


            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: 'orange' }}>
                        {/* <th style={{ border: '1px solid #ccc', padding: '10px' }}>Serial No.</th> */}
                        <th style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', color: 'white' }}>Department Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '10px' }}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {depArray ? depArray.map((department, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ccc', padding: '10px', color:'black' }}>{department.department}</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px', color:'black',display:'flex', justifyContent:'center' }}>
                                <MdDelete size={25} color='red' onClick={() => handleDel(department._id)}  />
                            </td>
                        </tr>
                    )) : ''}
                </tbody>
            </table>
        </div>
    )
}

export default DepartmentPage
