import React , { useEffect , useState } from 'react';
import './dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Instance from '../../config/Instance';
import ProductModal from './ProductModal';
import { AiFillDelete , AiFillEdit } from 'react-icons/ai'
import { message } from 'antd'
import { useHistory  } from "react-router-dom";


function AddInvoiceForm() {

    let history = useHistory();

    

    let gotId  = '';
    
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get('invoice');

    console.log(foo);

    if(foo){
        gotId = foo;
    }else{
        gotId = 0;
    }

    let [ customerList , setCustomerList ] = useState([]);


    let [ data , setData ] = useState([]);

    let [ grandTotal , setgrandTotal ] = useState(0);

    let [ id , setId ] = useState(gotId);

    useEffect(() => {
        fetchCustomer();
        fetchAll();
    },[])

    const fetchAll = async () => {

        if(gotId === 0){

            await Instance.get(`fetchSalesId`)
            .then(res => {
                id = res.data.value;
                setId(res.data.value);
                setInvoice('MEDC-0'+id);
            })
            .catch( error => {
                console.log(error);
            })

        }else{
            await Instance.get(`fetchSalesIdCus/${gotId}`)
            .then(res => {
                setInvoice(res.data.data.inv_id);
                setCustomer(res.data.data.customer_id);
            })
            .catch( error => {
                console.log(error);
            })
        }

        Instance.get(`fetchSales/${id}`)
        .then(res => {
            setData(res.data.data);
        })
        .catch( error => {
            console.log(error);
        })
    }

    const fetchCustomer = () => {
        Instance.get('fetchdata/customer')
        .then(res => {
            setCustomerList(res.data.data)
        })
        .catch( error => {
            console.log(error);
        })
    }

    let [ invoice , setInvoice ] = useState("");

    let [ customer , setCustomer ] = useState('');

    let [ show , setShow ] = useState(false);

    const handleClose = () => {
        setShow(!show);
        fetchAll();
    }

    const deleteProduct = async (id) => {
        let data = { 
            id : id,
        };
        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };
        await Instance.post(`deleteData/sales_product`,data , { headers }).
            then((res) => {

                if(res.status === 200 || res.status === '200'){
                    message.success(res.data.msg);
                    fetchAll();
                }
                else{
                    message.error('somthing went wrong');
                }
            })
            .catch((error) => {
                message.error('somthing went wrong');
                console.error(error);
            })
    }

    const customerHandle = (e) => {
        setCustomer(e.target.value);
    }

    const saveInvoice = async (e) => {

        e.preventDefault();

        if(gotId === 0){
            if(customer !== '' ){
                let inv_data = {
                    customer_id : customer,
                    inv_id : invoice,
                    status : 1,
                    grand_total : grandTotal
                }
                const headers = { 
                    'Content-Type': "application/x-www-form-urlencoded"
                };
                await Instance.post(`insert/sales`,inv_data , { headers }).
                    then((res) => {
        
                        if(res.status === 200 || res.status === '200'){
                            message.success(res.data.msg);
                            history.push("/dashboard/listinvoice") 
                        }
                        else{
                            message.error('somthing went wrong');
                        }
                    })
                    .catch((error) => {
                        message.error('somthing went wrong');
                        console.error(error);
                    })
            }else{
                message.error('Select Customer Name');
            }
        }else{
            if(customer !== '' ){
                let inv_data = {
                    customer_id : customer,
                    inv_id : invoice,
                    status : 1,
                    grand_total : grandTotal
                }
                const headers = { 
                    'Content-Type': "application/x-www-form-urlencoded"
                };
                await Instance.post(`updateData/sales/${gotId}`,inv_data , { headers }).
                    then((res) => {
        
                        if(res.status === 200 || res.status === '200'){
                            message.success(res.data.msg);
                            history.push("/dashboard/listinvoice") 
                        }
                        else{
                            message.error('somthing went wrong');
                        }
                    })
                    .catch((error) => {
                        message.error('somthing went wrong');
                        console.error(error);
                    })
            }else{
                message.error('Select Customer Name');
            }
        }
    }

    return (
        <>
            <div className="row mt-4">
                <div className="form-group col-md-6">
                    <label>Invoice Number : </label>
                    <input className="form-control" type="text" value={ invoice }></input>
                </div>
                <div className="form-group col-md-6">
                    <label>Customer Name : </label>
                    <select className="form-control" onChange={ customerHandle } value={ customer }>
                        <option>Select Customer</option>
                        { customerList.map((itm,k) => {
                            return(
                                <option value={itm.id} key={k}>{itm.name}</option>
                                )
                        })}
                    </select>
                </div>
                <div className="col-md-12 table-responsive">
                    <table className="table table-bordered">
                        <thead style={{ background:'#61DAFB' }}>
                            <tr>
                                <th>S.No</th>
                                <th>Product</th>
                                <th>Batch</th>
                                <th>Sales Type</th>
                                <th>Rate (Rs)</th>
                                <th>Quantity</th>
                                <th>Total (Rs)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.length > 0 ?
                            data.map((itm,i_k) => {
                                grandTotal = parseInt(grandTotal) + parseInt(itm.sub_total);
                                return(
                                    <>
                                        <tr key={ i_k }>
                                            <td>{ i_k  + 1}</td>
                                            <td style={{ background : '#a6a9ad' , textTransform : 'uppercase' , letterSpacing : '1px'}}>
                                               { itm.product_name }
                                            </td>
                                            <td>
                                               { itm.batch_id }
                                            </td>
                                            <td style={{ textTransform : 'capitalize' }}>
                                                { itm.sale_type }
                                            </td>
                                            <td>
                                                { itm.price }
                                            </td>
                                            <td>
                                                { itm.qty }
                                            </td>
                                            <td style={{ background : '#a6a9ad' , textTransform : 'uppercase' , letterSpacing : '1px'}}> 
                                                { itm.sub_total }
                                            </td>
                                            <td>
                                                <span style={{ padding : '5px'}} onClick={() => { deleteProduct(itm.id) } }>
                                                    <AiFillDelete />
                                                </span>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }) : 
                            <tr>
                                <td colspan="5" style={{ textAlign : 'center'}}>No Products added !!</td>
                            </tr>
                            }
                           
                        </tbody>
                    </table>
                </div>

                <div className="col-md-12 mt-5 mb-5">
                    <button className="btn btn-info btn-sm btn_float" onClick={ handleClose } >Add Products</button>
                </div>

                <div className="col-md-6 mt-5">
                        <h3>Grand Total : Rs { grandTotal } </h3>
                </div>
                <div className="col-md-6 mt-5">
                    <button className="bnt btn-sm btn-success btn_float_prd" style={{ marginRight: '50px',padding : '6px 16px !important'}} onClick={ saveInvoice }>SAVE INVOICE</button>
                </div>
            </div>

            { show ? 
            <ProductModal close={ handleClose } grandTotal ={ grandTotal } s_id= { id } />
            : null }

        </>
    )
}

export default AddInvoiceForm
