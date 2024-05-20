import { useForm } from 'react-hook-form'
import './login-form.scss'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

function LoginForm() {
    const [showError, setShowError] = useState(false)

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        axios
            .post('http://localhost:8080/api/users/login', data)
            .then((res) => {
                // console.log(res)
                Cookies.set('uid', res.data.userId, { expires: 1 })
                window.location.href = '/'
            })
            // eslint-disable-next-line no-unused-vars
            .catch((err) => {
                // console.error(err)
                setShowError(true)
            })
    }

    return (
        <div id="login-form-wrapper">
            <h1>Login into your account</h1>
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
                {showError && (
                    <div className="login-error">
                        <p>Username or Password not correct!</p>
                    </div>
                )}
                <div className="checkbox-container">
                    <div className="checkbox-field">
                        <input id="remember-me" type="checkbox" />
                        <label htmlFor="remember-me">Remember Me</label>
                    </div>
                    <div className="forgot-password-field">
                        <Link to={'/forgot-password'}>Forgot your Password?</Link>
                    </div>
                </div>
                <button type="submit" id="login-button">
                    Login
                </button>
            </form>
            <div className="register-field">
                <span>
                    {`Don't have account?`} <Link to={'/register'}>Register</Link>
                </span>
            </div>
            <div>
                <p className="sign-in-social">Or, Sign in with your social account</p>
                <button type="button" id="google-button">
                    <div className="sign-in-google">
                        <div>
                            <Icon icon="devicon:google" />
                        </div>
                        <span>Sign in with Google</span>
                    </div>
                </button>
                <button type="button" id="facebook-button">
                    <div className="sign-in-facebook">
                        <div>
                            <Icon icon="logos:facebook" />
                        </div>
                        <span>Sign in with Facebook</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default LoginForm
