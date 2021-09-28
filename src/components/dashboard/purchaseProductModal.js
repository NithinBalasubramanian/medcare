import React , { useState , useEffect } from 'react'
import Instance from '../../config/instance';
import { message } from 'antd';

const PurchaseProductModal = ({ close , grandTotal , s_id  }) => {

    let [ total , setTotal ] = useState(grandTotal);

    let [ subTotal , setSubTotal ] = useState(0);


    let [ productList ,setProductList ] = useState([]);

    let [ data , setData ] = useState({});

    let [ priceDisp , setPriceDisp ] = useState(true);

    console.log(productList);

    useEffect(() => { 
        fetchProduct();
    },[])

    const fetchProduct = () => {
        Instance.get('fetchdata/medicine')
        .then(res => {
            setProductList(res.data.data)
        })
        .catch( error => {
            console.log(error);
        })
    }

    const productFetch = (e) => {
        let id = e.target.value;

        Instance.get(`fetchEdit/medicine/${id}`)
        .then(res => {
            setData(res.data.data[0]);
            setSubTotal(prevstate => { 
                return parseInt(res.data.data[0].price_per_box);
            });
            setTotal(prevstate => { 
                return parseInt(grandTotal) + parseInt(res.data.data[0].price_per_box);
            });
        })
        .catch( error => {
            console.log(error);
        })
    }

    const priceDispHandle = (e) => {
        if(e.target.value === 'piece'){
            setPriceDisp(true);
        }else{
            setPriceDisp(false);
        }
    }

    let [ qty , setQty ] = useState(1);

    const qtyUpdate = (e) => {

        let value = e.target.value;

        if(priceDisp){
            let val = parseInt(value) * parseInt(data.price_per_box);
            setSubTotal(val);
            setTotal(prevstate => { 
                return parseInt(grandTotal) + parseInt(val);
            });
        }else{
            let b_val = parseInt(value) * parseInt(data.price_per_piece);
            setSubTotal(b_val);
            setTotal(prevstate => { 
                return parseInt(grandTotal) + parseInt(b_val);
            });
        }

        setQty(value);
    }

    const resetHandle = (e) => {

        e.preventDefault();

        let initialState = {
            id : '',
            s_name : '',
            track_id : '',
            type : '',
            manufacture_date : '',
            exp_date : '',
            price_per_piece :'',
            price_per_box : '',
        }

        setData(initialState);
        setQty(1);
        setSubTotal(0);
        setTotal(grandTotal);
    }

    const saveHandle = (e) => {
        e.preventDefault();

        let type_on = 'pieces';
        let price = 0;

        if(priceDisp){
            type_on = 'pieces';
            price = data.price_per_piece;
        }else{
            type_on = 'box';
            price = data.price_per_box;
        }

        let payload = {
            unq_id : s_id,
            product_id : data.id,
            batch_id : track_id,
            purchase_type : type_on,
            qty : qty,
            status : 1,
            manufacture_date : manufacture_date,
            exp_date : exp_date,
            sub_total : subTotal,
        }

        payload['price'] = price;

        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };

        Instance.post("insert/purchase_product",payload,{ headers })
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

        let initialState = {
            id : '',
            s_name : '',
            track_id : '',
            type : '',
            manufacture_date : '',
            exp_date : '',
            price_per_piece :'',
            price_per_box : '',
        }

        setData(initialState);
        setQty(1);
        setSubTotal(0);
    }

    const saveAndClose = async (e) => {
        e.preventDefault();

        let type_on = 'box';
        let price = 0;

        if(priceDisp){
            type_on = 'box';
            price = data.price_per_box;
        }else{
            type_on = 'pieces';
            price = data.price_per_piece;
        }

        let payload = {
            unq_id : s_id,
            product_id : data.id,
            batch_id : track_id,
            purchase_type : type_on,
            qty : qty,
            status : 1,
            manufacture_date : manufacture_date,
            exp_date : exp_date,
            sub_total : subTotal,
        }

        payload['price'] = price;

        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };

        await Instance.post("insert/purchase_product",payload,{ headers })
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

        let initialState = {
            id : '',
            s_name : '',
            track_id : '',
            type : '',
            manufacture_date : '',
            exp_date : '',
            price_per_piece :'',
            price_per_box : '',
        }

        setData(initialState);
        setQty(1);
        setSubTotal(0);
        close();
    }

    let [ track_id , setTrack_id ] = useState('');

    let [ manufacture_date , setManufacture_date ] = useState('');

    let [ exp_date , setExp_date ] = useState('');

    const addTrack = (e) => {

        if(e.target.name === 'track_id'){
            setTrack_id(e.target.value);
        }else if(e.target.name === 'manufacture_date'){
            setManufacture_date(e.target.value);
        }else if(e.target.name === 'exp_date'){
            setExp_date(e.target.value);
        }
    }

    return(
        <>
            <div className="productModal">
                <div className="productModalDisp">
                   <div className="productHeader">
                        <h1>Add Product</h1>
                        <span onClick ={ close }>x</span>
                    </div> 
                    <div className="productBody">
                        <form className="row mt-5 mb-5">
                            <div className="col-md-6 form-group">
                                <h4>Sub Total : Rs { subTotal }</h4>
                            </div>
                            <div className="col-md-6 form-group">
                                <h4>Grand Total : Rs { total }</h4>
                            </div>
                            <div className="form-group col-md-6" >
                                <label>Select Product</label>
                                <select className="form-control" onChange={ productFetch } value={ data.id }>
                                    <option>Select Product</option>
                                    { productList.map((itm, it_k) => {
                                        return <option value={ itm.id } >{ itm.product_name } </option>
                                    })}
                                </select>
                            </div>
                            { data ? 
                            <>
                                <div className="form-group col-md-6" >
                                    <label>Scientific name</label>
                                    <input type="text" value={ data.s_name } className="form-control" readOnly></input>
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>Batch Number</label>
                                    <input type="text" value={ track_id } name="track_id" onChange={ addTrack } className="form-control" ></input>
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>Product Type</label>
                                    <input type="text" value={ data.type } className="form-control" readOnly></input>
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>Manufature date</label>
                                    <input type="date" value={ manufacture_date } name="manufacture_date" onChange={ addTrack } className="form-control" ></input>
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>Expire date</label>
                                    <input type="date" value={ exp_date } name="exp_date" onChange={ addTrack } className="form-control" ></input>
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>Sell Type</label>
                                    <select className="form-control" onChange={ priceDispHandle } >
                                        <option value="box">Box</option>
                                        {/* <option value="pieces">Pieces</option> */}
                                    </select>
                                </div>
                            </>
                            : null}
                            {
                                priceDisp ? 
                                <>
                                    <div className="form-group col-md-6" >
                                        <label>Price per Box</label>
                                        <input type="text" value={ data.price_per_box } className="form-control" readOnly></input>
                                    </div>
                                </>
                                 : 
                                 <>
                                    <div className="form-group col-md-6" >
                                        <label>Price per Piece</label>
                                        <input type="text" value={ data.price_per_piece } className="form-control" readOnly></input>
                                    </div>
                                </>
                            }
                            <div className="form-group col-md-6" >
                                <label>Quantity</label>
                                <input type="text" value={ qty } className="form-control" onChange = { qtyUpdate }></input>
                            </div>
                            <div className="col-md-12">
                                <button className="btn btn-sm btn-primary btn_float_prd" onClick={ saveAndClose }>Save and close</button>
                                <button className="btn btn-sm btn-success btn_float_prd" onClick={ saveHandle }>Save and next</button>
                                <button className="btn btn-sm btn-warning btn_float_prd" type="button" onClick={ resetHandle }>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PurchaseProductModal