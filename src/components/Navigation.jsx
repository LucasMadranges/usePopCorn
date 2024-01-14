import Logo from "./Logo.jsx";

export default function Navigation({children}) {
    return (
        <nav className="nav-bar">
            <Logo/>
            {children}
        </nav>
    )
}