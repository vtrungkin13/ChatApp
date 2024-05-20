import RegisterForm from '../../components/RegisterForm'
import './register-page.scss'

function RegisterPage() {
    return (
        <div id="register-page-wrapper">
            <div id="image-container"></div>
            <div id="register-form-container">
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage
