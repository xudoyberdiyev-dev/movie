import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './app/App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster/>
        <App/>
    </StrictMode>,
)
