import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import { MdDelete, MdAdd, MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Topbar from './Topbar'
import SignUp from './SignUp'
import DepartmentPage from './department/DepartmentPage'
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



    // deans account
    const [deanEmail, setDeanEmail] = useState('')
    const [deanPassword, setDeanPassword] = useState('')
    const [departmentName, setDepartmentName] = useState('')
    const [deanName, setDeanName] = useState('')
    const [deanDesignation, setDeanDesignation] = useState('')

    const navigate = useNavigate()

    const [role, setRole] = useState(null)

    const [updateId, setUpdateId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)


    // profile
    const [orgProfile, setOrgProfile] = useState('')
    const [profile, setProfile] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [gender, setGender] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [previewUrl, setPreviewUrl] = useState(null);
    useEffect(() => {
        if (!profile) {
            return;
        }

        const objectUrl = URL.createObjectURL(profile);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // Clean up old preview
    }, [profile]);


    // update profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', profile); // Append the image file
        formData.append('userEmail', userEmail);
        formData.append('role', role);
        formData.append('gender', gender);
        formData.append('department', department);
        formData.append('designation', designation);
        formData.append('phoneNumber', phoneNumber);

        try {
            const response = await fetch(`${DOMAIN}/update-profile/${updateId}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData, // Don't set Content-Type manually
            });

            const data = await response.json();
            console.log(data);

            setSuccessMessage(data.message)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const role = localStorage.getItem('role')
        setRole(role)
    }, [])

    const handleEdit = (id) => {
        setUpdateId(id)
        setIsUpdate(!isUpdate)
        const formData = {
            userEmail,
            role,
            gender,
            department,
            designation,
            phoneNumber,
        };

        console.log(formData);
    }



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
    }, [])


    useEffect(() => {
        if (user?.profileImage?.data) {
            setOrgProfile(user.profileImage.data);
        } else {
            setOrgProfile('');
        }
        setUserEmail(user?.email || '')
        setUserRole(user?.role || '');
        setGender(user?.gender || '');
        setDepartment(user?.department || '');
        setDesignation(user?.designation || '');
        setPhoneNumber(user?.phoneNumber || '');
    }, [user])



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
    // create dean
    const createDeanHandle = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${DOMAIN}/create-dean`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ deanEmail, deanPassword, departmentName, deanName, deanDesignation, accRole })
            })

            const data = await response.json()

            console.log(data)
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const [displayDean, setDisplayDean] = useState([])
    const [deanId, setDeanId] = useState('')
    // display dean
    useEffect(() => {
        const disDean = async () => {
            try {
                const response = await fetch(`${DOMAIN}/display-dean`, {
                    method: 'GET',
                    credentials: 'include'
                })

                const data = await response.json()
                setDisplayDean(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        disDean()
    }, [])

    const [accRole, setAccRole] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const handleEditClickDean = (dean) => {
        const find = displayDean.find(id => dean._id === id._id)
        console.log(find)
        setDeanEmail(find.email || '')
        setDeanPassword(find.password || '')
        setDeanName(find.name || '')
        setDeanDesignation(find.designation || '')
        setDepartmentName(find.department || '')
        setDeanId(find._id)
        setAccRole(dean.role)
        setIsEdit(true)
    }

    // edit dean 
    const editDean = async (e) => {
        e.preventDefault()
        if (!window.confirm('are you sure you want to edit this account?')) {
            return
        }
        try {
            const response = await fetch(`${DOMAIN}/edit-dean/${deanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ deanEmail, deanPassword, departmentName, deanName, deanDesignation, accRole })
            })

            const data = await response.json()

            console.log(data)
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    // dele dean
    const deleteDean = async (id) => {

        if (!window.confirm('are you sure you want to delete this account?')) {
            return
        }
        try {
            const response = await fetch(`${DOMAIN}/delete-dean/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })

            const data = await response.json()

            console.log(data)
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }


    const [adminData, setAdminData] = useState([])
    useEffect(() => {
        const admin = async () => {
            try {
                const response = await fetch(`${DOMAIN}/display-admins`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await response.json()
                setAdminData(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        admin()
    }, [])

    const [isCreateAdmin, setIsCreateAdmin] = useState(false)



    // department
    const [depArray, setDepArray] = useState([])


    useEffect(() => {
        const getDepartment = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-department`, {
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
                {isUpdate ? <form
                    onSubmit={handleSubmit}

                    style={{
                        zIndex: '1',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginTop: '20px',
                        padding: '20px 30px',
                        border: '1px solid black',
                        backgroundColor: 'orange'
                    }}
                >
                    <MdCancel size={25} color='black' onClick={() => setIsUpdate(!isUpdate)} />

                    {successMessage ? <p style={{ color: 'white', fontSize: '16px', backgroundColor: 'green', padding: "7px 5px", textAlign: 'center', borderRadius: '5px' }}>{successMessage}</p> : ''}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <div style={{ display: 'flex', marginBottom: "10px" }}>
                            {(previewUrl || orgProfile) && (
                                <img
                                    src={previewUrl || `data:image/png;base64,${orgProfile}`}
                                    alt="Profile"
                                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                />
                            )}
                        </div>
                        <label>
                            Profile:
                            <input
                                type="file"

                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setProfile(e.target.files[0]); // <- This must be a File
                                    }
                                }}

                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </label>
                    </div>

                    <label>
                        Email:
                        <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value || '')}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>

                    <label>
                        Role:
                        <input
                            type="text"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value || '')}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>

                    <label>
                        Gender:
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value || '')}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>

                    <label>
                        Department:
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value || '')}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>

                    <label>
                        Designation:
                        <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value || '')}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>

                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value || '')}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>

                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        Submit
                    </button>
                </form> : ''}


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

                            {role === 'admin' ? <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'accounts' ? 'white' : 'black',
                                backgroundColor: activeSection === 'accounts' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('accounts')} >
                                Dean/President Account
                            </li> : ''}
                            {/* department-page */}
                            {role === 'admin' ? <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'admin' ? 'white' : 'black',
                                backgroundColor: activeSection === 'admin' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('admin')} >
                                Admin Account
                            </li> : ''}

                            {role === 'admin' ? <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'department-page' ? 'white' : 'black',
                                backgroundColor: activeSection === 'department-page' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('department-page')} >
                                Department
                            </li> : ''}
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div style={{ position: 'relative', backgroundColor: 'white', width: '80%', padding: '20px', borderRadius: '5px', color: '#fff', display: 'flex', justifyContent: 'center' }}>

                        {activeSection === 'profile_information' &&
                            <div style={{ display: 'flex', justifyContent: 'center', width: '80%', margin: '0 auto', }}>
                                <div style={{ display: 'inline-block', gap: '10px', width: '80%', margin: '0 auto', backgroundColor: 'gray', padding: '15px', borderRadius: '2px' }}>
                                    <h3 style={{ marginBottom: '20px', color: 'black' }}>Profile Information</h3>

                                    <div style={{ display: 'flex', marginBottom: "10px" }}>
                                        <img src={`data:image/jpeg;base64,${orgProfile}`} style={{ width: "100px", height: '100px' }} />
                                    </div>

                                    <div style={{ display: 'flex', }}>

                                        <div style={{ width: '50%', }}>
                                            <h4 style={{ marginBottom: "10px", color: 'white' }}>Email:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'white' }}>{user.email}</p>
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'white' }}>Role:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'white' }}>{user.role}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'white' }}>Gender:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'white' }}>{user.gender}</p>
                                        </div>
                                    </div>

                                    {/* <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'black' }}>Date of Birth:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'black' }}>{user.dateOfBirth}</p>
                                        </div>
                                    </div> */}


                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'white' }}>Department:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'white' }}>{user.department}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'white' }}>Designation:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'white' }}>{user.designation}</p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', }}>
                                        <div style={{ width: '50%' }}>
                                            <h4 style={{ marginBottom: "10px", color: 'white' }}>Phone Number:</h4>
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <p style={{ marginBottom: "10px", color: 'white' }}>{user.phoneNumber}</p>
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <button
                                            onClick={() => handleEdit(user._id)}
                                            style={{
                                                padding: '10px 30px',
                                                backgroundColor: 'orange',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                            }}
                                        >
                                            Update
                                        </button>
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


                        {activeSection === 'accounts' && role === 'admin' &&
                            <div style={{ color: 'black', width: '100%', height: '100%' }}>
                                {!isEdit ? <form onSubmit={createDeanHandle} style={{ width: '70%' }}>
                                    <h4>College Department Deans and President</h4>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Email:</label><br />
                                        <input
                                            placeholder="Email"
                                            type='email'
                                            required
                                            value={deanEmail}
                                            onChange={(e) => setDeanEmail(e.target.value)}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px',
                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Password:</label><br />
                                        <input
                                            placeholder="Password"
                                            type='password'
                                            required
                                            value={deanPassword}
                                            onChange={(e) => setDeanPassword(e.target.value)}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px'
                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label>Department Name:</label><br />
                                        <select
                                            id="options"
                                            value={departmentName}
                                            onChange={(e) => setDepartmentName(e.target.value)}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                height: '45px',
                                                padding: '2px 5px',
                                                fontSize: "14px",
                                                borderRadius: '5px',
                                                margin: '2px 0',
                                                // border: 'none'
                                            }}
                                        >
                                            <option value="">--Select Department--</option>
                                            {depArray && depArray.map((dep, index) => (
                                                <option key={index} value={dep.department}>{dep.department}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Name:</label><br />
                                        <input
                                            placeholder="Name"
                                            type='text'
                                            required
                                            value={deanName}
                                            onChange={(e) => setDeanName(e.target.value)}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px'
                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Designation:</label><br />
                                        <input
                                            placeholder="Designation"
                                            type='text'
                                            required
                                            value={deanDesignation}
                                            onChange={(e) => setDeanDesignation(e.target.value)}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px',
                                            }} />
                                    </div>


                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Role:</label><br />
                                        <select
                                            id="options"
                                            value={accRole}
                                            onChange={(e) => setAccRole(e.target.value)}
                                            style={{ padding: '5px', fontSize: '14px', marginTop: '5px' }}
                                        >
                                            <option value="">--Select Role--</option>
                                            <option value="dean">Dean</option>
                                            <option value="president">President</option>
                                        </select>
                                    </div>

                                    <button type='submit' style={{ padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px', border: 'none', }}>Submit</button>
                                </form> : <form onSubmit={editDean} style={{ width: '70%' }}>
                                    <h4>Edit Account</h4>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Email:</label><br />
                                        <input
                                            placeholder="Email"
                                            type='email'
                                            required
                                            value={deanEmail}
                                            onChange={(e) => setDeanEmail(e.target.value || '')}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px',
                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Password:</label><br />
                                        <input
                                            placeholder="Password"
                                            type='password'
                                            required
                                            value={deanPassword}
                                            onChange={(e) => setDeanPassword(e.target.value || '')}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px'
                                            }} />
                                    </div>

                                    {/* <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Department Name:</label><br />
                                        <input
                                            placeholder="Department Name"
                                            type='text'
                                            required
                                            value={departmentName}
                                            onChange={(e) => setDepartmentName(e.target.value || '')}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px',
                                            }} />
                                    </div> */}
                                    <div style={{ marginBottom: '10px' }}>
                                        <label>Department Name:</label><br />
                                        <select
                                            id="options"
                                            value={departmentName}
                                            onChange={(e) => setDepartmentName(e.target.value)}
                                            style={{
                                                width: '100%',
                                                boxSizing: 'border-box',
                                                height: '45px',
                                                padding: '2px 5px',
                                                fontSize: "14px",
                                                borderRadius: '5px',
                                                margin: '2px 0',
                                                // border: 'none'
                                            }}
                                        >
                                            <option value="">--Select Department--</option>
                                            {depArray && depArray.map((dep, index) => (
                                                <option key={index} value={dep.department}>{dep.department}</option>
                                            ))}
                                        </select>
                                    </div>


                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Name:</label><br />
                                        <input
                                            placeholder="Name"
                                            type='text'
                                            required
                                            value={deanName}
                                            onChange={(e) => setDeanName(e.target.value || '')}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px'
                                            }} />
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Designation:</label><br />
                                        <input
                                            placeholder="Designation"
                                            type='text'
                                            required
                                            value={deanDesignation}
                                            onChange={(e) => setDeanDesignation(e.target.value || '')}
                                            style={{
                                                padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px',
                                            }} />
                                    </div>


                                    <div style={{ marginBottom: '10px' }}>
                                        <label style={{ fontSize: '15px', color: 'orange' }}>Role:</label><br />
                                        <select
                                            id="options"
                                            value={accRole}
                                            onChange={(e) => setAccRole(e.target.value)}
                                            style={{ padding: '5px', fontSize: '14px', marginTop: '5px' }}
                                        >
                                            <option value="">--Select Role--</option>
                                            <option value="dean">Dean</option>
                                            <option value="president">President</option>
                                        </select>
                                    </div>

                                    <button type='submit' style={{ padding: '4px 5px', fontSize: '15px', width: '100%', borderRadius: '5px', border: 'none', }}>Submit</button>
                                </form>}




                                <table className={styles.styledTable}>
                                    <thead>
                                        <tr>
                                            {/* <th>Serial No.</th> */}
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Department Name</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {displayDean ? displayDean.map((dean, index) => (
                                            <tr key={index}>
                                                <td>{dean.email}</td>
                                                <td>{dean.password}</td>
                                                <td>{dean.department}</td>
                                                <td>{dean.name}</td>
                                                <td>{dean.designation}</td>
                                                <td>{dean.role}</td>
                                                {/* <td>{item.item.brand}</td>
                                                <td>{item.borrower}</td> */}

                                                <td style={{ display: 'flex', border: 'none', }}>
                                                    <div style={{ display: 'flex', justifyContent: "center", gap: '10px' }}>
                                                        <MdDelete color='red' size={27} onClick={() => deleteDean(dean._id)} />
                                                        <FaEdit color='blue' size={27} onClick={() => handleEditClickDean(dean)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : ''}
                                    </tbody>
                                </table>
                            </div>
                        }

                        {activeSection === 'admin' && <div>
                            <div onClick={() => navigate('/sign-up')} style={{
                                backgroundColor: 'orange',
                                display: 'flex', padding: '5px',
                                justifyContent: 'center', alignItems: 'center', width: '150px', cursor: 'pointer'
                            }}>
                                <MdAdd size={24} color='white' />
                                <p>Creat Admin</p>
                            </div>
                            <table className={styles.styledTable}>
                                <thead>
                                    <tr>
                                        {/* <th>Serial No.</th> */}
                                        <th>Email</th>
                                        <th>Password</th>
                                        {/* <th>Department Name</th> */}
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Role</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {adminData ? adminData.map((admin, index) => (
                                        <tr key={index}>
                                            <td style={{ color: 'black' }}>{admin.email}</td>
                                            <td style={{ color: 'black' }}>{admin.password}</td>
                                            {/* <td style={{color:'black'}}>{dean.department}</td> */}
                                            <td style={{ color: 'black' }}>{admin.name}</td>
                                            <td style={{ color: 'black' }}>{admin.designation}</td>
                                            <td style={{ color: 'black' }}>{admin.role}</td>
                                            {/* <td>{item.item.brand}</td>
                                                <td>{item.borrower}</td> */}

                                            {/* <td style={{ display: 'flex', border: 'none', }}>
                                                    <div style={{ display: 'flex', justifyContent: "center", gap: '10px' }}>
                                                        <MdDelete color='red' size={27} onClick={() => deleteDean(dean._id)} />
                                                        <FaEdit color='blue' size={27} onClick={() => handleEditClickDean(dean)} />
                                                    </div>
                                                </td> */}
                                        </tr>
                                    )) : ''}
                                </tbody>
                            </table>
                        </div>}


                        {activeSection === 'department-page' ? <div>
                            <div style={{
                                // backgroundColor: 'orange',
                                display: 'flex', padding: '5px',
                                justifyContent: 'center', alignItems: 'center', width: '100%', cursor: 'pointer'
                            }}> <DepartmentPage /> </div>
                        </div> : ''}

                    </div>
                </div>


            </div>

        </div>

    )
}

export default Settings
