import React , { useState , useEffect } from 'react';
import './dashboard.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Instance from '../../config/instance';
import { message } from 'antd'
import { useHistory } from "react-router-dom";


function Edit_Product() {

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
        Instance.get(`fetchEdit/medicine/${id}`).
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

        await Instance.post(`updateData/medicine/${id}`,data,{ headers })
        .then(response => { 
            if(response.data.status === 200 || response.data.status === '200')
            {
                message.success(response.data.msg); 
                history.push('/dashboard/Product');
            }
            else if(response.data.status === 400 || response.data.status === '400')
            {
                message.error(response.data.msg); 
                history.push('/dashboard/Product');
            }
            else{
                message.error('somthing went wrong');
                history.push('/dashboard/Product');
            }
        })
        .catch(error => { 
            console.log(error);
            message.error('somthing went wrong');
            history.push('/dashboard/Product'); 
        })
    }

    const onChangeHandler = (e) => {
        let nowValue = e.target.value;
        let nowName = e.target.name;
        setState(prevstate => { 
            return {...prevstate , [e.target.name] : nowValue }
        });
    }


    
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Edit Product</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/product" className="sideButton">
                        List Product
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Product Form</h1>
                 <div className="formPart row">
                    <div className="col-md-12 ">
                        <form className="row" onSubmit={ formSubmitHandler }>
                            <div className="form-group col-md-6">
                                <label>Product Name :* </label>
                                <input type="text" 
                                className={ ` form-control` }  
                                value={ state.product_name } 
                                onChange={ onChangeHandler } 
                                name="product_name"></input>
                            </div> 
                            <div className="form-group col-md-6">
                                <label>Scientific Name :</label>
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
                                <label>Product Purchase Rate per box:* </label>
                                <input type="text" 
                                className={  ` form-control` }  
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
            </div>
        </>
    )
}

export default Edit_Product
