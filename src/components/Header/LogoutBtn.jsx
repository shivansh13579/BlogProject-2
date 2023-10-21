import React from 'react'
import authservice from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logOutHandaler = ()=>{
        authservice.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
  return (
        <button 
        onClick={logOutHandaler}
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn
