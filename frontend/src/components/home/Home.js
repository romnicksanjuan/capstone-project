import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/ctc-logoo.jpg'
import bgImage from './home-background.jpg'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div style={{ position: "relative", display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', backgroundImage: `url(${bgImage})`, }}>
      {/* <div style={{ width: '50%', height: '100vh', background: '#F2BE00', position: "relative", }}> */}
      <div style={{ zIndex:'1',position: 'absolute', display: 'flex', alignItems: 'center', marginBottom: "20px", width: '40%',  top:'0', }}>
        <img src={logo} style={{ width: "200px", height: 'auto' }} />
        <div style={{ width: "100%" }}>
          <h2 style={{fontSize:'30px', fontSize: '25px', textAlign: 'center', color: 'white' }}>CEGUERA TECHNOLOGICAL COLLEGES</h2>
          <p style={{fontSize:'30px', fontSize: '25px', textAlign: 'center', color: 'white' }}>Iriga City, Philippines</p>
        </div>
      </div>
      <div style={{ zIndex:'1', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', }}>
        <div style={{ width: '50%', height: '300px' }}>
          <h2 style={{fontSize:'30px' ,textAlign: 'center', marginBottom: '40px', color: 'gray' }}>PROPERTY AND MERCHANDISE HUB MANAGEMENT SYSTEM WITH QR CODE TRACKING OF CEGUERA TECHNOLOGICAL COLLEGES</h2>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'black' }}>LOGIN ACCOUNT</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%', gap: '20px' }}>
            <button style={{ padding: '7px', color: 'white', backgroundColor: "orange",fontSize:'17px' }} onClick={() => navigate('/requester-login')}>Requester</button>
            <button style={{ padding: '5px', color: 'white', backgroundColor: "orange" }} onClick={() => navigate('/admin-login')}>Admin</button>
            <button style={{ padding: '5px', color: 'white', backgroundColor: "orange" }} onClick={() => navigate('/admin-login')}>Dean</button>
            <button style={{ padding: '5px', color: 'white', backgroundColor: "orange" }} onClick={() => navigate('/admin-login')}>President</button>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}
export default Home
