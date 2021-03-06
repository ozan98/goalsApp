import React from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import {getGoals, reset} from '../features/goals/goalSlice'


function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // This user state is coming from the auth state
    const {user} = useSelector((state) => state.auth)
    //retrive the state from goalSlice by specifying with state we want to retrive from
    const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

    useEffect(() =>{
        if(isError){
            console.log(message)
        }

        if(!user) {
            navigate('/login')
        }
        if(user){
            dispatch(getGoals())
        }

        //when the dashboard component unmounts(e.g user leaves dashboard) this will reset the goals
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch]) 
    
    if(isLoading) {
        return <Spinner />
    }
    
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className='goals'>
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard