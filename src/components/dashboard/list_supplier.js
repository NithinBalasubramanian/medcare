import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Instance from '../../config/instance';
import { message } from 'antd'
import ListSupplier from './listSupplierData';

function List_supplier() {

    let [ data , setData ] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
        Instance.get('fetchdata/supplier').
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
        Instance.post(`deleteData/supplier`,data , { headers }).
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
                console.error(error);
            })
    }


    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">List Supplier</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Supplier/AddSupplier" className="sideButton ">
                        Add Supplier
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Supplier List</h1>
                <ListSupplier  datas = { data }  onActionClick={ deleteHandler }  />
            </div>
        </>
    )
}

export default List_supplier;
