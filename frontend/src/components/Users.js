import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Topbar from './Topbar'
import style from '../css/Users.module.css'
import DOMAIN from '../config/config'
import { MdDelete, MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Users = () => {
    const [users, setUsers] = useState([])
    const [role, setRole] = useState('')
    const [id, setId] = useState('')
    const [isClick, setIsClick] = useState(false)

    useEffect(() => {
        const geyUsers = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-users`, {
                    method: 'GET',
                credentials:'include'
                })

                const data = await response.json()
                setUsers(data.users)
            } catch (error) {
                console.log(error)
            }
        }
        geyUsers()
    }, [])


    const handleEditRole = async (user) => {
        // console.log(user._id)
        setRole(user.role)
        setId(user._id)
        setIsClick(!isClick)
    }

    // submit edit role
    const handleSubmitEdit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${DOMAIN}/update-role/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ role }),
                credentials:'include'
            })

            const data = await response.json()

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    // delete item
    const handleDelete = async (user) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const response = await fetch(`${DOMAIN}/delete-user/${user._id}`, {
                method: 'DELETE',
                credentials:'include'
            })

            const data = await response.json()
            console.log(data)
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{ display: 'flex' }}>
            <Navbar />
            <div className={style.container}>
                <Topbar />
                <div>
                    <h2 style={{ color: "orange", padding: '10px 0' }}>Users List</h2>
                    <table className={style.styledTable}>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Department</th>
                                <th>Phone Number</th>
                                <th>Designation</th>
                                <th>Date of Birth</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users ? users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.department}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.designation}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td >{user.role}  </td>
                                    <td style={{ gap: '10px', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <div style={{ display: 'flex', justifyContent: "center", gap: '10px' }}>
                                            <MdDelete color='red' size={27} onClick={() => handleDelete(user)} />
                                        </div>
                                    </td>
                                </tr>
                            )) : ''}
                        </tbody>
                    </table>
                </div>

                {isClick &&
                    <form onSubmit={handleSubmitEdit} style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
                        padding: '30px', height: 'auto', width: '500px', gap: '20px', border: '1px solid black', borderRadius: '5px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => setIsClick(!isClick)} />
                        </div>

                        <div>
                            <label htmlFor="role">Role:</label><br />
                            <input className={style.input} type='text' id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
                    </form>
                }

            </div>

        </div>
    )
}

export default Users
