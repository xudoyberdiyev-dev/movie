import {Link, useLocation, useNavigate} from "react-router-dom";

export const CabinetSidebar = () => {
    const location = useLocation().pathname
    const navigate = useNavigate()
    const sideArr = [
        {name: "Profile", icon: '', link: '/cabinet'},
        {name: "Yangiliklar", icon: '', link: '/cabinet/news'},
        {name: "Murojatlar", icon: '', link: '/cabinet/complaint'},
        {name: "Sevimlilar", icon: '', link: '/cabinet/liked'},
    ]

    const logout = () => {
        localStorage.clear()
        navigate("/login")
        window.location.reload()
    }
    return (
        <nav id="sidebar">
            <ul>
                <li>
                    <span className="logo">coding2go</span>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#e8eaed">
                            <path
                                d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z"/>
                        </svg>
                    </button>
                </li>

                {sideArr.map((item) => (
                    <li className={location === item.link ? "active" : ""}>
                        <Link to={item.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                 fill="#e8eaed">
                                <path
                                    d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z"/>
                            </svg>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="bottom-content">
                <li className="" onClick={() => logout()}>
                    <Link to="#">
                        <i className="bx bx-log-out icon"/>
                        <h3 className={""}>Logout</h3>
                    </Link>
                </li>
            </div>
        </nav>
    )
}