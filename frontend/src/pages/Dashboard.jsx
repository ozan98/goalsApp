import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Dashboard() {
    const navigate = useNavigate()

    // This user state is coming from the auth state
    const {user} = useSelector((state) => state.auth)

    useEffect(() =>{
        if(!user) {
            navigate('/login')
        }
    }, [user, navigate])    
    return (
        <>
        </>
    )
}

export default Dashboard