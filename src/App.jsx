import './App.css'
import React,{useState,useEffect} from 'react'
import authservice from './appwrite/auth';
import authSlice from './store/authSlice';
import { useDispatch } from 'react-redux';
import { login,logout } from './store/authSlice';

function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect((userData)=>{
    authservice.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
  },[])


  return ( 
    <>
      <div>
        <h1 className='bg-gray-500 p-4'>Blog-Project</h1>
      </div>
     </>
  )
}

export default App
