import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/ctc-logoo.jpg'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: "relative", width: '100%' }}>
      <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', marginBottom: "20px", width: '50%' }}>
        <img src={logo} style={{ width: "140px", height: 'auto' }} />

        <div style={{ width: "100%" }}>
          <h2 style={{ fontSize: '25px', textAlign: 'center', color: 'white' }}>CEGUERA TECHNOLOGICAL COLLEGES</h2>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', backgroundColor: 'orange' }}>

        <div style={{ width: '50%', height: '300px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px' , color: 'white'}}>LOGIN ACCOUNT</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%', gap: '20px' }}>
            <button style={{ padding: '7px', color: 'black', }} onClick={() => navigate('/requester-login')}>Requester</button>
            <button style={{ padding: '5px', color: 'black', }} onClick={() => navigate('/admin-login')}>Admin</button>
            <button style={{ padding: '5px', color: 'black', }} onClick={() => navigate('/admin-login')}>Dean</button>
            <button style={{ padding: '5px', color: 'black', }} onClick={() => navigate('/admin-login')}>President</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
