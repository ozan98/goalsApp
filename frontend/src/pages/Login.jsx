import React from 'react'
import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
// useSelector is used to select from the state (e.g user, isLoading, isError)
// useDispatch is for dispatching a function (e.g register, reset, api thunk functions in reducer)
import {useSelector, useDispatch} from 'react-redux'
//to redirect
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // What we want from our state
    // Must specify what part of the state we are trying to retrieve from
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    if(isLoading) {
        <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                 <div className="form-group">
                    <input type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                    />
                 </div>
                 <div className="form-group">
                    <input type="pasword"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange}
                    />
                 </div>
                 <div className="form-group">
                    <button type="submit" className="btn btn-bloc">
                        Submit
                    </button>
                 </div>
                 </form>
            </section>
        </>
    )
}

export default Login