import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListCustomer from './listCustomerData';
import Instance from '../../config/instance';
import { message } from 'antd'

const List_customer = () => {

    let [ data , setData ] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
        Instance.get('fetchdata/customer').
            then((res) => {
                setData(res.data.data);
                message.success(res.data.msg);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const deleteHandler = (id) => {
        let data = { 
            id : id,
        };
        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };
        Instance.post(`deleteData/customer`,data , { headers }).
            then((res) => {

                if(res.status === 200 || res.status === '200'){
                    message.success(res.data.msg);
                    fetchData();
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

    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">List Customer</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Customer/AddCustomer" className="sideButton ">
                        Add Customer
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Customer List</h1>
                <ListCustomer datas = { data }  onActionClick={ deleteHandler } />
            </div>
        </>
    )
}

export default List_customer
