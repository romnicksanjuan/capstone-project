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

function RequestItems() {
    const contentRef = useRef(null)
    const [isShowContent, setIsShowContent] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [role, setRole] = useState(null)
    const [showCreateRequestForm, setShowCreateRequestForm] = useState(false)

    const [department, setDepartment] = useState('')
    const [purpose, setPurpose] = useState('')

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Format to 'yyyy-mm-dd'

    const [isFabrication, setIsFabrication] = useState(false)
    const [isRepair, setIsRepair] = useState(false)
    const [isReplacement, setIsReplacement] = useState(false)
    const [isAdditional, setIsAdditional] = useState(false)

    const [others, setOthers] = useState('')

    const [quantity_and_materials, setQuantity_And_Materials] = useState(Array(5).fill(null).map(() => ({ quantity: '', materials: '' })))

    const [requestedBy, setRequestedBy] = useState('')

    const [successMessage, setSuccessMessage] = useState('')

    const [deanApproval, setDeanApproval] = useState('pending')
    const [presidentApproval, setPresidentApproval] = useState('pending')
    const [requesItems, setRequestedItems] = useState([])
    const [items, setItems] = useState({})

    // approval 
    const [approve, setApprove] = useState('approved')
    const [reject, setReject] = useState('rejected')

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
        try {
            const response = await fetch(`${DOMAIN}/submit-request`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    department, purpose, date, isFabrication, isRepair, isReplacement, isAdditional,
                    quantity_and_materials,others,
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
                // console.log(data)

                setActiveSection(data.requestData[0]._id)
                setItems(data.requestData[0])
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


            <div className={styles.Dashboard}>

                {/* {(role === 'admin' || role === 'dean' || role === 'president') ? <Topbar /> : ''} */}
                <h2 style={{ color: 'orange', textAlign: 'start', margin: "0" }}>Request Items</h2>


                <div style={{ display: 'flex', minHeight: "95%", width: "100%", height: 'auto', gap: '20px' }}>
                    <nav style={{ display: 'flex', position: 'relative', padding: '15px', justifyContent: 'center', backgroundColor: 'white', width: "20%", borderRadius: '5px', overflow: 'hidden' }}>
                        <ul style={{ listStyle: 'none', width: '100%', overflow: 'hidden', }}>
                            {requesItems ? requesItems.map((item) => (
                                <li key={item._id} style={{
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    color: activeSection === item._id ? 'white' : 'black',
                                    backgroundColor: activeSection === item._id ? 'orange' : '',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    textOverflow: "ellipsis"
                                }} onClick={() => handleActiveButton(item._id, item)}>
                                    {item.department}
                                </li>
                            ))
                                : ''}
                        </ul>


                        {role === 'requester' && <div onClick={() => showForm()} style={{
                            display: 'flex', backgroundColor: 'orange', position: 'absolute', bottom: '5px', justifyContent: 'center',
                            width: '90%', padding: '5px 10px', cursor: 'pointer', borderRadius: '2px', gap: "5px"
                        }}>
                            <MdAddBox color='white' size={25} />
                            <p style={{ fontSize: '17px', color: 'white' }}>Create Request</p>
                        </div>}
                    </nav>

                    {/* Main Content */}
                    <div style={{ backgroundColor: 'white', width: '80%', padding: '10px', borderRadius: '5px', color: '#fff' }}>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight:"20px" }}>
                            <RiPrinterFill onClick={() => handlePrintClick()} color='black' size={24} />
                        </div>
                        {activeSection === items._id &&
                            <div ref={contentRef} style={{ width: '100%', height: 'auto', margin: '0 auto', color: 'black', }}>
                                {/* Dep/Lab/Room */}
                                <div className={style.paper}>
                                    <div className={style.header}>
                                        <img src={img} width={100} height={100} />
                                        <h4>Ceguera Technological Colleges</h4>
                                    </div>

                                    <div className={style.receipt}>
                                        <h3 style={{ textAlign: 'center' }}>CEGUERA</h3>
                                        <h5 style={{ textAlign: 'center' }}>Technological Colleges</h5>
                                        <h5 style={{ textAlign: 'center', }}>Iriga Philippines</h5>
                                        <h3 style={{ textAlign: 'center' }}>REQUEST FOR MATERIALS</h3>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <label style={{}}>Date:</label>
                                            <input type="date"
                                                disabled
                                                value={items.date}
                                                style={{
                                                    border: 'none',
                                                    borderBottom: '1px solid black',
                                                    outline: 'none', // optional: removes blue outline on focus
                                                    paddingLeft: '5px',
                                                    fontSize: '15px'
                                                }} />
                                        </div>


                                        {/* purpose */}
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <label style={{ fontWeight: 'bold', fontSize: '13px' }}>Dep/Lab/Room:</label>
                                            <input type="text" disabled
                                                value={items.department}
                                                style={{
                                                    border: 'none',
                                                    borderBottom: '1px solid black',
                                                    outline: 'none', // optional: removes blue outline on focus
                                                    paddingLeft: '5px',
                                                    fontSize: '15px',
                                                    width: "100%"
                                                }} />
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <label style={{ fontWeight: 'bold', fontSize: '13px' }}>Purpose:</label>
                                            <input type="text" disabled
                                                value={items.purpose}
                                                style={{
                                                    border: 'none', fontSize: '13px',
                                                    borderBottom: '1px solid black',
                                                    outline: 'none', // optional: removes blue outline on focus
                                                    paddingLeft: '5px',
                                                    fontSize: '15px',
                                                    width: "100%"
                                                }} />
                                        </div>



                                        {/* check boxes */}
                                        <div style={{ display: 'flex', justifyContent: "space-around", marginTop: '5px' }}>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <input type='checkbox' disabled checked={items.isFabrication} style={{ transform: 'scale(1.2)', }} />
                                                <label>Fabrication </label>
                                            </div>

                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <input type='checkbox' disabled checked={items.isRepair} style={{ transform: 'scale(1.2)', }} />
                                                <label>Repair </label>
                                            </div>

                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <input type='checkbox' disabled checked={items.isReplacement} style={{ transform: 'scale(1.2)', }} />
                                                <label>Replacement </label>
                                            </div>

                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <input type='checkbox' disabled checked={items.isAdditional} style={{ transform: 'scale(1.2)', }} />
                                                <label>Additional </label>
                                            </div>
                                        </div>

                                        {/* others */}
                                        <div style={{ display: 'flex', marginTop: '10px' }}>
                                            <label style={{ fontWeight: 'bold', fontSize: '13px' }}>Others: </label>
                                            <input type='text' disabled
                                                value={items.others}
                                                style={{
                                                    fontSize: '13px',
                                                    border: 'none',
                                                    borderBottom: '1px solid black',
                                                    outline: 'none', // optional: removes blue outline on focus
                                                    paddingLeft: '5px',
                                                    fontSize: '15px',
                                                    width: "100%"
                                                }} />
                                        </div>

                                        {/* table request */}
                                        <table border="1" style={{ width: "100%", marginTop: '10px', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ border: '1px solid black', fontSize: '14px' }}>Quantity</th>
                                                    <th style={{ border: '1px solid black', fontSize: '14px' }}>Materials</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.quantity_and_materials.map((item, index) => (
                                                    <tr key={index}>
                                                        <td style={{ fontSize: '14px', border: '1px solid black', width: '20%' }}>
                                                            <input type="number" disabled name={`quantity-${index}`} value={item.quantity || ''} style={{ textAlign: 'center', width: '100%', outline: "none", border: "none", paddingLeft: "10px" }} />
                                                        </td>
                                                        <td style={{ fontSize: '14px', border: '1px solid black' }}>
                                                            <input type="text" disabled name={`materials-${index}`} value={item.materials || ''} style={{ width: '100%', outline: "none", border: "none", paddingLeft: "10px" }} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* requested by */}
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                                            <label style={{ fontWeight: 'bold', fontSize: '12px' }}>Requested By:</label>
                                            <input type="text"
                                                value={items.requestedBy}
                                                disabled
                                                style={{
                                                    border: 'none',
                                                    borderBottom: '1px solid black',
                                                    outline: 'none', // optional: removes blue outline on focus
                                                    paddingLeft: '5px',
                                                    fontSize: '15px',
                                                    width: "50%"
                                                }} />
                                        </div>

                                        {/* status */}

                                        {role === 'requester' || role === 'admin' ? <div className={style.approvalContainer} >
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: "10px", alignItems: 'center', marginTop: '10px' }}>
                                                <label className={style.approval}>Endorsed By Dean:</label>
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: "white", backgroundColor: items.deanApproval === 'approved' ? 'green' : items.deanApproval === 'pending' ? 'orange' : 'red',
                                                    padding: "5px 10px"
                                                }}>{items.deanApproval}</p>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: "10px", alignItems: 'center', marginTop: '10px' }}>
                                                <label className={style.approval}>President Approval:</label>
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: "white", backgroundColor: items.presidentApproval === 'approved' ? 'green' : items.presidentApproval === 'pending' ? 'orange' : 'red',
                                                    padding: "5px 10px"
                                                }}>{items.presidentApproval}</p>
                                            </div>
                                        </div> : ''}

                                        {role === 'dean' || role === 'president' ? <div style={{ display: 'flex', marginTop: '10px', gap: "10px" }}>
                                            <button className={style.approve} onClick={() => decisionButton(items._id, 'approved')}>Approve</button>
                                            <button className={style.approve} onClick={() => decisionButton(items._id, 'rejected')}>Reject</button>
                                        </div> : ''}

                                    </div>
                                </div>
                            </div>
                        }





                        {/* form */}
                        {showCreateRequestForm ?
                            <div style={{ display: 'flex', justifyContent: 'center', width: '90%', height: 'auto', minHeight: '', margin: '0 auto', color: 'black', }}>

                                {/* Dep/Lab/Room */}
                                <form onSubmit={submitRequest} style={{ backgroundColor: "white", minWidth: "55%", padding: "10px", padding: "20px", border: '1px solid #000000' }}>
                                    <h3 style={{ textAlign: 'center' }}>CEGUERA</h3>
                                    <h5 style={{ textAlign: 'center' }}>Technological Colleges</h5>
                                    <h5 style={{ textAlign: 'center', }}>Iriga Philippines</h5>
                                    <h3 style={{ textAlign: 'center' }}>REQUEST FOR MATERIALS</h3>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <label style={{ color: 'black',}}>Date:</label>
                                        <input type="date" style={{
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px'
                                        }}
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>


                                    {/* purpose */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <label style={{ fontWeight: 'bold', color: 'black',fontSize:'13px'  }}>Dep/Lab/Room:</label>
                                        <input type="text" style={{
                                            fontSize:'13px' ,
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px',
                                            width: "100%"
                                        }}
                                            required
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <label style={{ fontWeight: 'bold', color: 'black',fontSize:'13px'  }}>Purpose:</label>
                                        <input type="text" style={{
                                            fontSize:'13px' ,
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px',
                                            width: "100%"
                                        }}
                                            required
                                            value={purpose}
                                            onChange={(e) => setPurpose(e.target.value)}
                                        />
                                    </div>



                                    {/* check boxes */}
                                    <div style={{ display: 'flex', justifyContent: "space-around", marginTop: '5px' }}>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }}
                                                checked={isFabrication}
                                                onChange={(e) => setIsFabrication(e.target.checked)} />
                                            <label style={{ color: 'black' }}>Fabrication </label>
                                        </div>

                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }}
                                                checked={isRepair}
                                                onChange={(e) => setIsRepair(e.target.checked)}
                                            />
                                            <label style={{ color: 'black' }}>Repair </label>
                                        </div>

                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }}
                                                checked={isReplacement}
                                                onChange={(e) => setIsReplacement(e.target.checked)}
                                            />
                                            <label style={{ color: 'black' }}>Replacement </label>
                                        </div>

                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }}
                                                checked={isAdditional}
                                                onChange={(e) => setIsAdditional(e.target.checked)}
                                            />
                                            <label style={{ color: 'black' }}>Additional </label>
                                        </div>
                                    </div>

                                    {/* others */}
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold', color: 'black',fontSize:'13px'  }}>Others: </label>
                                        <input type='text'

                                            style={{
                                                fontSize:'13px' ,
                                                border: 'none',
                                                borderBottom: '1px solid black',
                                                outline: 'none', // optional: removes blue outline on focus
                                                paddingLeft: '5px',
                                                fontSize: '15px',
                                                width: "100%"
                                            }}
                                            value={others}
                                            onChange={(e) => setOthers(e.target.value)}
                                        />
                                    </div>

                                    {/* table request */}
                                    <table style={{ width: "100%", marginTop: '10px', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ border: '1px solid black',fontSize:'14px'  }}>Quantity</th>
                                                <th style={{ border: '1px solid black',fontSize:'14px'  }}>Materials</th>
                                                <th style={{ border: 'none' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {quantity_and_materials.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ border: '1px solid black', width: '20%' }}>
                                                        <input type="number" name={`quantity-${index}`} value={item.quantity} onChange={(e) => handleItemChange(e, 'quantity', index)} style={{ width: '100%', outline: "none", border: "none", paddingLeft: "10px", textAlign: 'center' }} />
                                                    </td>
                                                    <td style={{ border: '1px solid black' }}>
                                                        <input type="text" name={`materials-${index}`} value={item.materials} onChange={(e) => handleItemChange(e, 'materials', index)} style={{ width: '100%', outline: "none", border: "none", paddingLeft: "10px" }} />
                                                    </td>
                                                    <td style={{ border: 'none', }}>
                                                        <MdDelete color='red' size={20} type='button' style={{ position: '', right: '0' }} onClick={() => deleteField(index)} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div style={{ backgroundColor: 'gray', display: 'flex', padding: '2px 5px', cursor: 'pointer', justifyContent: 'start', alignItems: 'center', marginTop: '5px', width: 'fit-content', border: '1px solid darkgray' }} onClick={() => handleAddItem()}>

                                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content', border: '1px solid black', }}> */}
                                        <MdAddBox size={20} color='orange' />
                                        <p style={{ fontSize: '10px', color: 'white' }}>Add Field</p>
                                        {/* </div> */}

                                    </div>

                                    {/* requested by */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold', color: 'black',fontSize:'13px'  }}>Requested By:</label>
                                        <input type="text" style={{
                                            fontSize:'13px' ,
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px',
                                            width: "50%"
                                        }}
                                            required
                                            value={requestedBy}
                                            onChange={(e) => setRequestedBy(e.target.value)}
                                        />
                                    </div>
                                    <button type='submit'
                                        className={style.submit}>
                                        Submit Request
                                    </button>
                                </form>
                            </div>
                            : ''}
                    </div>
                </div>

            </div>

        </div>

    )
}

export default RequestItems
