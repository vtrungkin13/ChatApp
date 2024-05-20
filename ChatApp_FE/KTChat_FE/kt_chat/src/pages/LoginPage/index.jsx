import LoginForm from '../../components/LoginForm'
import './login-page.scss'

function LoginPage() {
    return (
        <div id="login-page-wrapper">
            <div id="image-container"></div>
            <div id="login-form-container">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage
