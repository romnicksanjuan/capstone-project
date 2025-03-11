import React, { useEffect } from 'react'
import DOMAIN from '../../config/config'
import { useNavigate } from 'react-router-dom'


const Auth = async () => {
    const navigate = useNavigate()

    try {
        const response = await fetch(`${DOMAIN}/verify-token`, {
            method: "GET",
            credentials: "include",
        })

        const data = await response.json()

        if (!response.ok) {
            console.log(data.message)
            navigate("/")
            alert(data.message)
            return
        }

        return data
    } catch (error) {
        console.log(error)
    }



}

export default Auth
