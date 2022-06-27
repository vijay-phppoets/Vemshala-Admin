import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { notification } from 'antd'


const Logout = props => {

    useEffect(() => {
        localStorage.removeItem('PikyUserToken')
        localStorage.removeItem('PikyUser')
        notification.success({
            message: "You are logged out successfully.",
            placement: "bottomRight"
        })
    }, [])


    return (
        <Redirect to="/login" />
    )
}


export default Logout

