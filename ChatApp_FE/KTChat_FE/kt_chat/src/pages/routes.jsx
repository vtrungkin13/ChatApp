import { lazy } from 'react'

const LoginPage = lazy(() => import('./LoginPage'))
const RegisterPage = lazy(() => import('./RegisterPage'))
const HomePage = lazy(() => import('./HomePage'))

export default [
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path:'/register',
        component: RegisterPage,
    },
    {
        path: '/',
        component: HomePage
    }
]
