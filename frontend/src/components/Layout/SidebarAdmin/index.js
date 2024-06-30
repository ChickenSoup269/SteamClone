import Sidebar from './Sidebar'
function SideBarAdmin({ children }) {
    return (
        <div>
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default SideBarAdmin
