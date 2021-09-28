import React , { useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Instance from '../../config/Instance';
import { message } from 'antd';

function AddProductForm() {

    const initialState = {
        product_name : '',
        s_name : '',
        status : 1,
        track_id : '',
        type : 'tablet',
        piece_per_box  : '',
        price_per_piece  : '',
        price_per_box  : '',
        sell_rate : '',
        manufacture_date : '',
        exp_date : '',
        categoryError : '',
        productError : '',
        productRateError : '',
        disable : false,
    };

    const [ state , setState] = useState({ 
        product_name : '',
        s_name : '',
        piece_per_box  : '',
        price_per_piece  : '',
        track_id : '',
        type : 'tablet',
        price_per_box  : '',
        sell_rate : '',
        manufacture_date : '',
        exp_date : '',
        status : 1,
        categoryError : '',
        productError : '',
        productRateError : '',
        disable : false,
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
        if(name === 'product_name'){
            if(value.length < 4){
                setState( prevstate => {
                    return { ...prevstate , productError : '( Name strength must be above 8 )'}
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , productError : ''}
                });
            }
        }
        if(name === 'price_per_box'){
            if(value.length === 0){
                setState( prevstate => {
                    return { ...prevstate , productRateError : '( Rate must not be null )'}
                });
            }else{
                setState( prevstate => {
                    return { ...prevstate , productRateError : ''}
                });
            }
        }
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(state.productRateError === '' &&  state.productError === ''){
            let data = state;
            const headers = { 
                'Content-Type': "application/x-www-form-urlencoded"
            };
    
            Instance.post("Insert/medicine",data,{ headers })
            .then(response => { 
                if(response.data.status === 200 || response.data.status === '200')
                {
                    message.success(response.data.msg); 
                }
             })
            .catch(error => { console.log(error) })
            setState( initialState );
        }
    }

    return (
        <>
            <div className="formPart row">
                <div className="col-md-12 ">
                    <form className="row" onSubmit={ formSubmitHandler }>
                        <div className="form-group col-md-6">
                            <label>Product Name :* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.productError }</small></span>
                            <input type="text" 
                            className={ (state.productError !== '') ? `form-control is-invalid` : ` form-control` }  
                            value={ state.product_name } 
                            onChange={ onChangeHandler } 
                             name="product_name"></input>
                        </div> 
                        <div className="form-group col-md-6">
                            <label>Scientific Name :</label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.productError }</small></span>
                            <input type="text" 
                            className={ ` form-control` }  
                            value={ state.s_name } 
                            onChange={ onChangeHandler } 
                             name="s_name"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Type :* </label>
                            <select 
                            className={ ` form-control` }  
                            value={ state.type } 
                            onChange={ onChangeHandler } 
                             name="type">
                                <option value="tablet">Tablet</option>
                                 <option value="syrup">Syrup</option>
                                 <option value="injection">Injection</option>
                             </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Batch Code :* </label>
                            <input type="text" 
                            className={ ` form-control` }  
                            value={ state.track_id } 
                            onChange={ onChangeHandler } 
                             name="track_id"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Piece in Box :* </label>
                            <input type="text" 
                            className={ ` form-control` }  
                            value={ state.piece_per_box } 
                            onChange={ onChangeHandler } 
                             name="piece_per_box"></input>
                        </div> 
                        <div className="form-group col-md-6">
                            <label>Price per piece :* </label>
                            <input type="text" 
                            className={ ` form-control` }  
                            value={ state.price_per_piece } 
                            onChange={ onChangeHandler } 
                             name="price_per_piece"></input>
                        </div> 
                        <div className="form-group col-md-6">
                            <label>Product Purchase Rate per box:* </label><span><small style= {{ color:'red',padding:'opx 10px' }}>{ state.productRateError }</small></span>
                            <input type="text" 
                            className={ (state.productRateError !== '') ? `form-control is-invalid` : ` form-control` }  
                            value={ state.price_per_box } 
                            onChange={ onChangeHandler } 
                             name="price_per_box"></input>
                        </div> 
                        <div className="form-group col-md-6">
                            <label>Product Selling Rate :* </label>
                            <input type="text" 
                            className={ ` form-control` }  
                            value={ state.sell_rate } 
                            onChange={ onChangeHandler } 
                             name="sell_rate"></input>
                        </div> 
                        <div className="form-group col-md-6">
                            <label>Manufacture Date :* </label>
                            <input type="date" 
                            className={` form-control` }  
                            value={ state.manufacture_date } 
                            onChange={ onChangeHandler } 
                             name="manufacture_date"></input>
                        </div> 
                        <div className="form-group col-md-6">
                            <label>Expire Date :* </label>
                            <input type="date" 
                            className={ ` form-control` }  
                            value={ state.exp_date } 
                            onChange={ onChangeHandler } 
                             name="exp_date"></input>
                        </div> 
                        <div className="col-md-12">
                            <button type="submit" className="sideButton submitButton">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProductForm
