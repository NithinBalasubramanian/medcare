import React from 'react';
import { IconContext } from 'react-icons';
import { MdDashboard } from 'react-icons/md';
import { ImUsers } from 'react-icons/im';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { GrProductHunt } from 'react-icons/gr';
import './dashboard.css';
import { NavLink } from 'react-router-dom';

function Sidebar(props) {

    return(
        <IconContext.Provider value={{color:"#fff",size:"20px"}}>
        <div className={ (props.status) ? 'sidebar_cont active_side' : 'sidebar_cont'}>
            <div className="sidebarList">
                <NavLink to='/dashboard' exact className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <MdDashboard />
                    </div>
                    <div className="navMenu">
                        Dashboard
                    </div>
                </NavLink>
                <p className="sideSub">Master</p>
                <NavLink to='/dashboard/Customer'  className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <ImUsers />
                    </div>
                    <div className="navMenu">
                        Customer
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Employee' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <FiUsers />
                    </div>
                    <div className="navMenu">
                        Employee
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Supplier' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <AiOutlineUserSwitch />
                    </div>
                    <div className="navMenu">
                        Supplier
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Product' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <GrProductHunt />
                    </div>
                    <div className="navMenu">
                        Product
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Purchase' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <GrProductHunt />
                    </div>
                    <div className="navMenu">
                        Purchase
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Invoice' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <GrProductHunt />
                    </div>
                    <div className="navMenu">
                        Sales
                    </div>
                </NavLink>
                <p className="sideSub">Reports</p> 
                <NavLink to='/dashboard/Purschase-reports' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <GrProductHunt />
                    </div>
                    <div className="navMenu">
                        Purchase Report
                    </div>
                </NavLink>
                <NavLink to='/dashboard/Sales-Reports' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <GrProductHunt />
                    </div>
                    <div className="navMenu">
                        Sales Report
                    </div>
                </NavLink>
                <p className="sideSub">General Settings</p>
                <NavLink to='/dashboard/Area' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <GrProductHunt />
                    </div>
                    <div className="navMenu">
                        Area
                    </div>
                </NavLink>
                <NavLink to='/dashboard/EmployeeType' className="navCont" activeClassName="navActive">
                    <div className="navIcon">
                        <GrProductHunt />
                    </div>
                    <div className="navMenu">
                        Emp Type
                    </div>
                </NavLink>
            </div>
        </div>
        </IconContext.Provider>
    )
}

export default Sidebar;
