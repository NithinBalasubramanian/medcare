import { message } from 'antd';
import React , { useState } from 'react';
import Instance from '../../config/instance';
import { useHistory } from "react-router-dom";

const LoginComponent = () => {

    let history = useHistory();
    
    let initialState = {
        email : '',
        password : ''
    }

    let [ data , setData ] = useState(initialState);

    const onChangeHandler = (e) => {
        let nowValue = e.target.value;
        let nowName = e.target.name;
        setData(prevstate => { 
            return {...prevstate , [nowName] : nowValue }
        });
    }

    const loginHandler = (e) => {
        e.preventDefault();

        if(initialState.email.trim !== '' || initialState.password.trim !== ''){
            let dataSet = data;
            const headers = { 
                'Content-Type': "application/x-www-form-urlencoded"
            };
    
            Instance.post("Login",dataSet,{ headers })
            .then(response => { 
                if(response.data.status === 200 || response.data.status === '200')
                {
                    message.success(response.data.msg); 
                    localStorage.setItem('name',response.data.data[0].name);
                    history.push("/") 
                }
                else if(response.data.status === 201 || response.data.status === '201')
                {
                    message.error(response.data.msg); 
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
        }else{
            message.warning('Please enter the values !!!');
        }
    }

    return(
        <>
            <div className="loginContent">
                <div className="loginColumn">
                    <h1>Login</h1>
                    <form onSubmit={ loginHandler } >
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" onChange={ onChangeHandler }></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={ onChangeHandler }></input>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-sm btn-success" value="LOGIN"></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginComponent