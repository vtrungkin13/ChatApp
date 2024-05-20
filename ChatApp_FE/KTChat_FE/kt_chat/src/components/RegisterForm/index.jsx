import { useForm } from 'react-hook-form'
import './register-form.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

function RegisterForm() {
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, ...userData } = data
            axios
                .post('http://localhost:8080/api/users/register', userData)
                .then((res) => {
                    // console.log(res)
                    Cookies.set('uid', res.data.userId, { expires: 1 })
                    window.location.href = '/'
                })
                .catch((err) => {
                    // console.log(err)
                    setErrorMsg(err.response.data.message)
                    setShowError(true)
                })
        } else {
            setErrorMsg('Password is not match!')
            setShowError(true)
        }
    }

    return (
        <div id="register-form-wrapper">
            <h1>Create your account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-field">
                    <label htmlFor="username">
                        Username <span>*</span>
                    </label>
                    <input
                        required
                        id="username"
                        type="text"
                        placeholder="Username"
                        {...register('username')}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="email">
                        Your Email Address <span>*</span>
                    </label>
                    <input
                        required
                        id="email"
                        type="text"
                        placeholder="Your Email Address"
                        {...register('email')}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="name">
                        Your Name <span>*</span>
                    </label>
                    <input
                        required
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        {...register('name')}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="password">
                        Password <span>*</span>
                    </label>
                    <input
                        required
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="confirm-password">
                        Confirm Password <span>*</span>
                    </label>
                    <input
                        required
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        {...register('confirmPassword')}
                    />
                </div>
                {showError && (
                    <div className="register-error">
                        <p>{errorMsg}</p>
                    </div>
                )}
                <button type="submit" id="register-button">
                    Register
                </button>
            </form>
            <div className="login-field">
                <span>
                    {`Already have account?`} <Link to={'/login'}>Login</Link>
                </span>
            </div>
        </div>
    )
}

export default RegisterForm
