import { Routes, Route } from 'react-router-dom'
import routes from './pages/routes.jsx'
import { Suspense } from 'react'

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {routes.map((route, index) => {
                    return <Route key={index} path={route.path} element={<route.component />} />
                })}
            </Routes>
        </Suspense>
    )
}

export default App
