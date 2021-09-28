import React , { useState } from 'react';
import Instance from '../../config/instance';
import { message } from 'antd'

function AddEmployeeForm() {
    
    const initialState = { 
        name : '',
        email : '',
        contact : '',
        s_contact : '',
        area : '',
        status : 1,
        address : '',
        nameError : '',
        emailError : '',
        contactError : '',
        seccontactError : '',
        disable : true,
    };

    const [ state , setState] = useState({ 
        name : '',
        email : '',
        contact : '',
        s_contact : '',
        area : '',
        status : 1,
        address : '',
        nameError : '',
        emailError : '',
        contactError : '',
        seccontactError : '',
        disable : true,
    });

    const onChangeHandler = (e) => {

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
                setState( prevstate => {
                    return { ...prevstate , nameError : '( Name strength must be above 8 )'}
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , nameError : ''}
                });
            }
        }
        if(name === 'contact'){
            if(value.length !== 10){
                setState( prevstate => {
                    return { ...prevstate , contactError : '( Contact Number is invalid )' }
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , contactError : ''}
                });
            }
        }
        if(name === 's_contact'){
            if(value.length !== 10){
                setState( prevstate => {
                    return { ...prevstate , seccontactError : '( Contact Number is invalid )' }
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , seccontactError : ''}
                });
            }
        }
        if(name === 'email'){
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(value)){
                setState( prevstate => {
                    return { ...prevstate , emailError : '( Invalid Email ID )' }
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , emailError : '' }
                });
            }
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        console.log(state);
        if(state.nameError === '' && state.emailError === '' && state.contactError === ''){
            let data = state;
            const headers = { 
                'Content-Type': "application/x-www-form-urlencoded"
            };
    
            Instance.post("insert/employee",data,{ headers })
            .then(response => { 
                if(response.data.status === 200 || response.data.status === '200')
                {
                    message.success(response.data.msg); 
                }
                else if(response.data.status === 400 || response.data.status === '400')
                {
                    message.error(response.data.msg); 
                }
                else{
                    message.error('somthing went wrong');
                }
            })
            .catch(error => { 
                console.log(error);
                message.error('somthing went wrong'); 
            })
            setState( initialState );
        }
    }

    return (
        <>
        <div className="formPart row">
            <div className="col-md-12 ">
                <form className="row" onSubmit = { formSubmitHandler }>
                    <div className="form-group col-md-6">
                        <label>Employee Name :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.nameError }</small></span>
                        <input type="text" 
                        className={ (state.nameError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.name } 
                        onChange={ onChangeHandler } 
                        name="name"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Email :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.emailError }</small></span>
                        <input type="email" 
                        className={ (state.emailError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.email } 
                        onChange={ onChangeHandler } 
                        name="email"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Contact :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.contactError }</small></span>
                        <input type="text" 
                        className={ (state.contactError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.contact } 
                        onChange={ onChangeHandler } 
                        name="contact"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Employee Secondary Contact : </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.seccontactError }</small></span>
                        <input type="text" 
                        className={ (state.seccontactError !== '') ? `form-control is-invalid` : ` form-control` }  
                        value={ state.s_contact } 
                        onChange={ onChangeHandler } 
                        name="s_contact"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Address : </label>
                        <textarea type="text" 
                        rows="5" 
                        className="form-control" 
                        onChange={ onChangeHandler } 
                        name="address" 
                        vlaue={ state.address }></textarea>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" 
                        className="sideButton submitButton" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default AddEmployeeForm;
