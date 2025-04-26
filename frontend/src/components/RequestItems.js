import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import Topbar from './Topbar'
import { MdAddBox, MdDelete } from "react-icons/md";
import style from '../css/Request.module.css'
import { RiPrinterFill } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
// const token = localStorage.getItem("token")
import img from '../images/ctc-logoo.jpg'
import { MdCancel } from "react-icons/md";

function RequestItems() {
    const navigate = useNavigate();

    const contentRef = useRef(null)
    const [isShowContent, setIsShowContent] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [role, setRole] = useState(null)
    const [showCreateRequestForm, setShowCreateRequestForm] = useState(false)

    const [department, setDepartment] = useState('')
    const [purpose, setPurpose] = useState('')

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [isFabrication, setIsFabrication] = useState(false)
    const [isRepair, setIsRepair] = useState(false)
    const [isReplacement, setIsReplacement] = useState(false)
    const [isAdditional, setIsAdditional] = useState(false)

    const [others, setOthers] = useState('')

    const [quantity_and_materials, setQuantity_And_Materials] = useState([{ quantity: '', materials: '' }])

    const [requestedBy, setRequestedBy] = useState('')

    const [successMessage, setSuccessMessage] = useState('')

    const [deanApproval, setDeanApproval] = useState('pending')
    const [presidentApproval, setPresidentApproval] = useState('pending')
    const [requesItems, setRequestedItems] = useState([])
    const [items, setItems] = useState({})

    // approval 
    const [approve, setApprove] = useState('approved')
    const [reject, setReject] = useState('rejected')

    const [status, setStatus] = useState('')

    // console.log('s', status)
    useEffect(() => {
        const updateStatus = async () => {
            try {

                if (status !== '') {
                    console.log(items._id)
                    console.log(status)
                    const response = await fetch(`${DOMAIN}/update-status/${items._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status }),
                        credentials: 'include'
                    })

                    const data = await response.json()
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        updateStatus()
    }, [status])

    useEffect(() => {
        const role = localStorage.getItem('role')
        setRole(role)
    }, [])


    const handleActiveButton = (id, item) => {
        setActiveSection(id)
        // console.log(id === item._id)
        setShowCreateRequestForm(false)
        // console.log(item)
        setItems(item)
    }

    // show form
    const showForm = () => {
        setShowCreateRequestForm(!showCreateRequestForm)
        setActiveSection('')
    }

    const handleItemChange = (e, field, index) => {
        const updatedItems = [...quantity_and_materials];
        updatedItems[index][field] = e.target.value;
        setQuantity_And_Materials(updatedItems);
    };

    const handleAddItem = () => {
        setQuantity_And_Materials([...quantity_and_materials, { quantity: '', materials: '' }]);
    };

    const deleteField = (index) => {
        setQuantity_And_Materials(quantity_and_materials.filter((_, i) => i !== index))
    }

    // submit request 
    const submitRequest = async (e) => {
        e.preventDefault()


        // console.log(department, purpose, date,
        //     quantity_and_materials,
        //     requestedBy,)

        // return
        try {
            const response = await fetch(`${DOMAIN}/submit-request`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    department, purpose, date, isFabrication, isRepair, isReplacement, isAdditional,
                    quantity_and_materials, others,
                    requestedBy,
                })
            })
            if (!response.ok) {
                return console.log(response.status)
            }
            const data = await response.json()
            console.log(data)
            // setSuccessMessage(data.message)
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    // get all requested
    useEffect(() => {
        const getRequested = async () => {
            try {
                const response = await fetch(`${DOMAIN}/display-requested`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    console.log(response.statusText);
                    return;
                }

                const data = await response.json();
                setRequestedItems(data.requestData);
                console.log(data)

                // setActiveSection(data.requestData[0]._id)
                // setItems(data.requestData[0])
            } catch (error) {
                console.log(error);
            }
        };
        getRequested();
    }, [])

    // approval
    const decisionButton = async (requestId, decision) => {
        console.log(requestId)
        try {
            const response = await fetch(`${DOMAIN}/decision`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ decision, requestId })
            })

            const data = await response.json()
            if (!response.ok) {
                console.log(response.statusText)
                return
            }

            console.log(data)
            alert(data.message)

        } catch (error) {
            console.log(error)
        }
    }

    // rejection
    const rejectionButton = async () => {
        try {
            const response = await fetch(`${DOMAIN}/rejection`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ reject })
            })

            const data = response.json()
            if (!response.ok) {
                console.log(response.statusText)
                return
            }

            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleAfterPrint = () => {
        return new Promise((resolve) => {
            console.log('Print dialog hasF been closed or completed');
            setIsShowContent(false);
            // setTimeout(resolve, 100)
            resolve()
        });
    };

    const handleBeforePrint = () => {

        return new Promise((resolve) => {

            setTimeout(() => {
                setIsShowContent(true);
                resolve()
            }, 1000)

        });
    };

    // printer
    const reactToPrintFn = useReactToPrint({
        documentTitle: `${new Date()}`,
        contentRef: contentRef,
        // onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,

    });

    const handlePrintClick = () => {
        // You can manually set state here just before calling print
        setIsShowContent(true); // Ensure the content is visible

        setTimeout(() => {
            reactToPrintFn()
        }, 0)
    };



    if (role === null) {
        return null
    }

    return (
        <div style={{ display: 'flex' }}>
            <Navbar />


            <div style={{ position: 'relative' }} className={styles.Dashboard}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: 'orange', textAlign: 'start', margin: "0" }}>Request Items</h2>

                    <button style={{ backgroundColor: 'orange', padding: '5px 7px' }} onClick={() => showForm()}>Create Request</button>
                </div>

                {role === 'dean' || role === 'admin' || role === 'president' ?
                    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>

                        <thead >
                            <tr>
                                <th>No</th>
                                <th>Requester Name</th>
                                <th>Department</th>
                                {/* <th>Items</th> */}
                                {/* <th>Quantity</th> */}
                                <th>Purpose</th>
                                <th>Endorsed By Dean</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requesItems.map((request, index) => (
                                <tr key={index} style={{ cursor: 'pointer' }}>
                                    <td onClick={() => navigate('/request-full-details', { state: { request: request } })}>{index + 1}</td>
                                    <td onClick={() => navigate('/request-full-details', { state: { request: request } })}>{request.requestedBy}</td>
                                    <td onClick={() => navigate('/request-full-details', { state: { request: request } })}>{request.department}</td>
                                    {/* <td>{request.items}</td> */}
                                    {/* <td>{request.quantity}</td> */}
                                    <td onClick={() => navigate('/request-full-details', { state: { request: request } })}>{request.purpose}</td>
                                    <td>{role === 'dean' ? <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <button onClick={() => decisionButton(request._id, 'approved')} style={{ backgroundColor: 'green', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            approve
                                        </button>

                                        <button onClick={() => decisionButton(request._id, 'rejected')} style={{ backgroundColor: 'red', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            reject
                                        </button>
                                    </div> : request.deanApproval}</td>
                                    <td>{role === 'president' ? <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <button onClick={() => decisionButton(request._id, 'approved')} style={{ backgroundColor: 'green', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            approve
                                        </button>

                                        <button onClick={() => decisionButton(request._id, 'rejected')} style={{ backgroundColor: 'red', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            reject
                                        </button>
                                    </div> : request.presidentApproval}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : ''}

                {role === 'requester' && <h4 style={{ marginTop: "5px" }}>My Request</h4>}
                {/* requester */}
                {role === 'requester' ?
                    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead >
                            <tr>
                                <th>No</th>
                                <th>Requester Name</th>
                                <th>Department</th>
                                <th>Purpose</th>
                                <th>Endorsed By Dean</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requesItems.map((request, index) => (
                                <tr key={index} onClick={() => navigate('/request-full-details', { state: { request: request } })}>
                                    <td>{index + 1}</td>
                                    <td>{request.requestedBy}</td>
                                    <td>{request.department}</td>
                                    <td>{request.purpose}</td>
                                    <td>{role === 'dean' ? <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <button onClick={() => decisionButton(request._id, 'approved')} style={{ backgroundColor: 'green', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            approve
                                        </button>

                                        <button onClick={() => decisionButton(request._id, 'rejected')} style={{ backgroundColor: 'red', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            reject
                                        </button>
                                    </div> : request.deanApproval}</td>
                                    <td>{role === 'president' ? <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <button onClick={() => decisionButton(request._id, 'approved')} style={{ backgroundColor: 'green', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            approve
                                        </button>

                                        <button onClick={() => decisionButton(request._id, 'rejected')} style={{ backgroundColor: 'red', padding: '3px', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            reject
                                        </button>
                                    </div> : request.presidentApproval}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : ''}











                {/* form request */}
                {showCreateRequestForm ? <form
                    onSubmit={submitRequest}
                    style={{
                        maxWidth: "400px",
                        margin: "50px auto",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        backgroundColor: "orange",
                        fontFamily: "Arial, sans-serif",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <MdCancel size={25} color='black' onClick={() => setShowCreateRequestForm(!showCreateRequestForm)} />
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Request Form</h2>


                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Date:
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDepartment(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Department:
                        </label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Purpose:
                        </label>
                        <input
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                    </div>



                    <div>
                        {quantity_and_materials.map((item, index) => (
                            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                                <div>
                                    {/* <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                        Quantity:
                                    </label> */}
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(e, 'quantity', index)}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </div>


                                <div>
                                    {/* <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                        Materials:
                                    </label> */}
                                    <input
                                        type="text"
                                        placeholder="Materials"
                                        value={item.materials}
                                        onChange={(e) => handleItemChange(e, 'materials', index)}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        <button style={{ padding: '3px 5px' }} type='button' onClick={handleAddItem}>Add More</button>
                    </div>



                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Requested By:
                        </label>
                        <input
                            type="text"
                            value={requestedBy}
                            onChange={(e) => setRequestedBy(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#007BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Submit
                    </button>
                </form> : ''}


            </div>

        </div>

    )
}

export default RequestItems
