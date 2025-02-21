import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './app/App.jsx'
import {Toaster} from 'react-hot-toast'
import 'primereact/resources/themes/lara-light-cyan/theme.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toaster/>
        <App/>
    </StrictMode>
)