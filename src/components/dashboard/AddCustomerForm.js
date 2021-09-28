import React , { Component } from 'react';
import Instance from '../../config/Instance';
import { message } from 'antd'

const initialState = {
    name : '',
    email : '',
    contact : '',
    s_contact : '',
    gst_number : '',
    area : '',
    address : '',
    status : 1,
    nameError : '',
    emailError : '',
    contactError : '',
    seccontactError : '',
    disable : false,
};

class AddCustomerForm extends Component {
    constructor(){
        super()
        this.state = {
            name : '',
            email : '',
            contact : '',
            s_contact : '',
            gst_number : '',
            area : '',
            status : 1,
            address : '',
            nameError : '',
            emailError : '',
            contactError : '',
            seccontactError : '',
            disable : false,
        }
    }

    formSubmitHandler = async (e) => {
        e.preventDefault();
        let data = this.state;
        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };

        Instance.post("insert/customer",data,{ headers })
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
        this.setState( initialState );
    }

    verification = (name , value) => {
        if(name === 'name'){
            if(value.length < 8){
                this.setState({nameError : '( Name strength must be above 8 ) '});
                this.setState({ disable : true });
            }else{
                this.setState({nameError : '' });
                this.setState({ disable : false });
            }
        }
        if(name === 'contact'){
            if(value.length !== 10){
                this.setState({ contactError : '( Contact Number is invalid ) ' });
                this.setState({ disable : true });
            }else{
                this.setState({contactError : '' });
                this.setState({ disable : false });
            }
        }
        if(name === 's_contact'){
            if(value.length !== 10){
                this.setState({ seccontactError : '( Contact Number is invalid ) ' });
                this.setState({ disable : true });
            }else{
                this.setState({seccontactError : '' });
                this.setState({ disable : false });
            }
        }
        if(name === 'email'){
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(value)){
                this.setState({ emailError : '( Invalid Email ID )' });
                this.setState({ disable : true });
            }else{
                this.setState({ emailError : '' });
                this.setState({ disable : false });
            }
        }
    }

    enterDataHandler = (e) => {
        let now_name = e.target.name;
        let now_value = e.target.value;
        this.verification(now_name , now_value);
        this.setState({ [now_name] : now_value });
    }

    render() {
        return (
            <>
                <div className="formPart row">
                    <div className="col-md-12 ">
                        <form className="row" onSubmit={ this.formSubmitHandler }>
                            <div className="form-group col-md-6">
                                <label>Customer Name : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.nameError }</small></span>
                                <input type="text" 
                                className={ (this.state.nameError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="name" 
                                value={this.state.name} 
                                onChange={ this.enterDataHandler } 
                                required></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Email : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.emailError }</small></span>
                                <input type="email" 
                                className={ (this.state.emailError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="email"  
                                value={this.state.email} 
                                onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Contact : * </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.contactError }</small></span>
                                <input type="text" 
                                className={ (this.state.contactError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="contact"  
                                value={this.state.contact} 
                                onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Customer Secondary Contact : </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ this.state.seccontactError }</small></span>
                                <input type="text" 
                                className={ (this.state.seccontactError !== '') ? `form-control is-invalid` : ` form-control` }  
                                name="s_contact"  
                                value={this.state.s_contact} 
                                onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>GSTIN : * </label>
                                <input type="text" 
                                className={` form-control` }  
                                name="gst_number"  
                                value={this.state.gst_number} 
                                onChange={ this.enterDataHandler }></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address : </label>
                                <textarea type="text" 
                                className = "form-control"
                                rows="5"   
                                name="address"  
                                value={this.state.address} 
                                onChange={ this.enterDataHandler }></textarea>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" 
                                className = "sideButton submitButton"
                                disabled={ this.state.disable }>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            )
        }
    }

export default AddCustomerForm;
