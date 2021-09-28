import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListPurchTable from './listPurchTable';
import Instance from '../../config/instance';
import { message } from 'antd'

const ListPurchase = () => {

    let [ data , setData ] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
        Instance.get('fetchpurchasedata/purchase').
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
        Instance.post(`deleteData/purchase`,data , { headers }).
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
                <h1 className="col-md-8">List Purchase</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/invoice" className="sideButton ">
                        Add Purchase
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Invoice List</h1>
                <ListPurchTable datas = { data }  onActionClick={ deleteHandler } />
            </div>
        </>
    )
}

export default ListPurchase
