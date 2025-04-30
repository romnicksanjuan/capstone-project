import React, { useEffect, useState, useRef } from 'react'
import DOMAIN from '../../config/config'
import { useSearchParams } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import { RiPrinterFill } from "react-icons/ri";
import img from '../../images/ctc-logoo.jpg'
import styles from '../reports-css/DepartmentUsageReport.module.css'
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
};

const thTdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  color: "black"
};

const headerStyle = {
  backgroundColor: "#f2f2f2",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: 'black'
};

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};


const DepartmentUsageReport = () => {
  const contentRef = useRef()
  const [DepartmentUsageReport, setDepartmentUsageReport] = useState([])
  // console.log('test')
  useEffect(() => {
    const getreport = async () => {
      try {
        const response = await fetch(`${DOMAIN}/department-usage`, {
          method: 'GET',
          credentials: 'include'
        })

        const data = await response.json()

        console.log(data)
        setDepartmentUsageReport(data)
      } catch (error) {
        console.log(error)
      }
    }
    getreport()
  }, [])

  // printer
  const reactToPrintFn = useReactToPrint({
    documentTitle: `${new Date()}`,
    contentRef: contentRef,
  });
  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2 style={{ color: "orange", padding: '10px 0' }}>Department Usage Report</h2>
        <div style={{ marginRight: '10px' }}>
          <RiPrinterFill onClick={() => reactToPrintFn()} color='black' size={35} />
        </div>
      </div>

      <div ref={contentRef}>
        <div className={styles.header}>
          <img src={img} width={100} height={100} />
          <h4>Ceguera Technological Colleges</h4>
        </div>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>Department</th>
              <th>Item</th>
              <th>Total Issued</th>
            </tr>
          </thead>

          <tbody>
            {DepartmentUsageReport.map((item, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{item.department}</td>
                <td style={thTdStyle}>{item.itemDescription}</td>
                <td style={thTdStyle}>{item.totalIssued}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DepartmentUsageReport
