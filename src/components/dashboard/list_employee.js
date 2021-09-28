import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListEmployee from './listEmployeeData';
import Instance from '../../config/instance';
import { message } from 'antd'

function List_employee() {

    let [ data , setData ] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
        Instance.get('fetchdata/employee').
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
        Instance.post(`deleteData/employee`,data , { headers }).
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
                <h1 className="col-md-8">List Employee</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/Employee/AddEmployee" className="sideButton ">
                        Add Employee
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Employee List</h1>
                <ListEmployee  datas = { data }  onActionClick={ deleteHandler }  />
            </div>
        </>
    )
}

export default List_employee;
