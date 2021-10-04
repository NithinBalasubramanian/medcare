import React,{ useState } from 'react';
import logo from '../../assets/logo512.png';
import '../../display.css';
import './dashboard.css';
import { NavLink} from 'react-router-dom';
import Sidebar from './Sidebar';
import Maincont from './Maincont';
import { BrowserRouter , Redirect } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';
import LoginComponent from './LoginComponent';
import { useHistory } from "react-router-dom";
import { message } from 'antd';

function Dashboard_main() {

    let history = useHistory();

    const [ display_status , setdisplay_status ] = useState(true);

    const sidebarStatusHandler = () =>{
        setdisplay_status(!display_status);
    }

    const clear = () => {
        localStorage.clear();
        message.success('Logged out successfully');
        // history.push('/dashboard');
        window.location.reload();
    }

    return (

        <BrowserRouter>

        { localStorage.getItem('name') ?
            <>
            <div className="nav_main">
                <div className="logo">
                <BiMenuAltLeft  onClick={sidebarStatusHandler} size="50px" color="#fff" style={{margin:"20px"}}/>
                <div className="logo_img">
                    {/* <img src={logo} width="100%" alt="logo" height="100%" /> */}
                </div>
                <h4>
                    MEDCARE
                </h4>
                </div>
                <div className="nav_list">
                <div className="nav_list_outs">
                    <div className="nav_list_outs_data">

                        {/* Top right lists  */}

                        {/* <ul>
                            <li><NavLink to='/' exact activeClassName="mainNavActive">HOME</NavLink></li>
                            <li><NavLink to='/project' activeClassName="mainNavActive">PROJECTS</NavLink></li>
                            <li><NavLink to='/dashboard' activeClassName="mainNavActive">DASHBOARD</NavLink></li>
                        </ul> */}
                    </div>
                </div>
                </div>

                <p className="logout" onClick={ clear }>Logout</p>
            </div>
            <Maincont />
            </> : 
            <LoginComponent /> }
        </BrowserRouter>
    )
}

export default Dashboard_main;
