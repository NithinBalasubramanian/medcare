import React , { useState , useEffect } from 'react';
import './dashboard.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Instance from '../../config/instance';
import { message } from 'antd'
import { useHistory } from "react-router-dom";


function Edit_employee() {

    const [ state , setState] = useState({});

    const history = useHistory();

    const [ err ,setErr ] = useState({
        nameError : '',
        emailError : '',
        contactError : '',
        seccontactError : '',
        disable : false,
    })

    let { id } = useParams();

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
        Instance.get(`fetchEdit/employee/${id}`).
        then((res) => {
            setState(res.data.data[0]);
            message.success(res.data.msg);
        })
        .catch((error) => {
            console.error(error);
        })
    }


    const formSubmitHandler = async (e) => {
        e.preventDefault();
        let data = state;
        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };

        await Instance.post(`updateData/employee/${id}`,data,{ headers })
        .then(response => { 
            if(response.data.status === 200 || response.data.status === '200')
            {
                message.success(response.data.msg); 
                history.push('/dashboard/Employee');
            }
            else if(response.data.status === 400 || response.data.status === '400')
            {
                message.error(response.data.msg); 
                history.push('/dashboard/Employee');
            }
            else{
                message.error('somthing went wrong');
                history.push('/dashboard/Employee');
            }
        })
        .catch(error => { 
            console.log(error);
            message.error('somthing went wrong');
            history.push('/dashboard/Employee'); 
        })
    }

    const enterDataHandler = (e) => {
        let nowValue = e.target.value;
        let nowName = e.target.name;
        setState(prevstate => { 
            return {...prevstate , [e.target.name] : nowValue }
        });
        verification(nowName , nowValue);
    }



    const verification = (name , value) => {
        if(name === 'name'){
            if(value.length < 8){
                setErr( prevstate => {
                    return { ...prevstate , nameError : '( Name strength must be above 8 )'}
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setErr( prevstate => {
                    return { ...prevstate , nameError : ''}
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
        if(name === 'contact'){
            if(value.length !== 10){
                setErr( prevstate => {
                    return { ...prevstate , contactError : '( Contact Number is invalid )' }
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setErr( prevstate => {
                    return { ...prevstate , contactError : ''}
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
        if(name === 's_contact'){
            if(value.length !== 10){
                setErr( prevstate => {
                    return { ...prevstate , seccontactError : '( Contact Number is invalid )' }
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setErr( prevstate => {
                    return { ...prevstate , seccontactError : ''}
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
        if(name === 'email'){
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(value)){
                setErr( prevstate => {
                    return { ...prevstate , emailError : '( Invalid Email ID )' }
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : true }
                });
            }else{
                setErr( prevstate => {
                    return { ...prevstate , emailError : '' }
                });
                setErr( prevstate => {
                    return { ...prevstate , disable : false }
                });
            }
        }
    }
    
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Edit Employee</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Customer" className="sideButton">
                        List Employee
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Employee Form</h1>
                <div className="formPart row">
                    <div className="col-md-12 ">
                        <form className="row" onSubmit={  formSubmitHandler }>
                            <div className="form-group col-md-6">
                                <label>Employee Name : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ err.nameError }</small></span>
                                <input type="text" 
                                className={ ( err.nameError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="name" 
                                value={state.name} 
                                onChange={ enterDataHandler } 
                                required></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Employee Email : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ err.emailError }</small></span>
                                <input type="email" 
                                className={ (err.emailError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="email"  
                                value={state.email} 
                                onChange={ enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Employee Contact : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ err.contactError }</small></span>
                                <input type="text" 
                                className={ (err.contactError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="contact"  
                                value={state.contact} 
                                onChange={ enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Employee Secondary Contact : </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ err.seccontactError }</small></span>
                                <input type="text" 
                                className={ (err.seccontactError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="s_contact"  
                                value={state.s_contact} 
                                onChange={ enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>GSTIN : * </label>
                                <input type="text" 
                                className={` form-control` }  
                                name="gst_number"  
                                value={state.gst_number} 
                                onChange={ enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address : </label>
                                <textarea type="text" 
                                className = "form-control"
                                rows="5"   
                                name="address"  
                                value={state.address} 
                                onChange={ enterDataHandler }></textarea>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" 
                                className = "sideButton submitButton"
                                disabled={ state.disable }>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit_employee
