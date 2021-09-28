import React , { useEffect , useState } from "react";
import Instance from '../../config/Instance';
import { message } from 'antd'


const SalesManagement = () => {

    const initialState = {
        'type' : '',
    }

    const [ state , setState] = useState(initialState);

    const [ datas , setDatas ] = useState([]);

    useEffect(() => {
        fetchArea();
    },[])

    const changeHandler = (e) => {
        let nowValue = e.target.value;
        let nowName = e.target.name;
        setState(prevstate => { 
            return {...prevstate , [nowName] : nowValue }
        });
    }

    const addArea = (e) => {

        e.preventDefault();
        let data = state;
        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };

        Instance.post("insert/emp_type",data,{ headers })
        .then(response => { 
            if(response.data.status === 200 || response.data.status === '200')
            {
                message.success(response.data.msg); 
                fetchArea();
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
        setState( initialState );
    }

    const fetchArea = () => {
        Instance.get('fetchdata/emp_type').
        then((res) => {
            setDatas(res.data.data);
            message.success(res.data.msg);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const onActionClick = (id) => {
        let data = { 
            id : id,
        };
        const headers = { 
            'Content-Type': "application/x-www-form-urlencoded"
        };
        Instance.post(`deleteData/emp_type`,data , { headers }).
            then((res) => {

                if(res.status === 200 || res.status === '200'){
                    message.success(res.data.msg);
                    fetchArea();
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

    return(
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Employee Type Management</h1>
            </div>
            <div className="mainCart">
                <h1>Add Employee Type</h1>
                <form className="row" onSubmit={ addArea }>
                    <div className="form-group col-md-6">
                        <lable>Employee Type</lable>
                        <input type="text" name='type' onChange={ changeHandler } value={ state.type } className="form-control"></input>
                        <button className="btn btn-success btn-sm" type="submit">Submit</button>
                    </div>
                </form>
                <h1 className="mt-3"> Employee Type List</h1>
                <div className="table-responsive tablePart">
                    <table className="table table-bordered table-hover table-striped">
                        <thead style={{'backgroundColor':'#61DAFB'}} >
                            <tr>
                                <th>S.No</th>
                                <th>Employee Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        { datas.length > 0 ? 
                            <tbody>
                                { datas.map((itm,k) => {
                                    let id = itm.id;
                                    return ( 
                                    <tr>
                                        <td>{ k+1 }</td>
                                        <td>{ itm.type }</td>
                                        <td><button type="button" onClick = {() => { onActionClick(id) }} className="btn btn-danger btn-sm" key={k}>Delete</button></td>
                                    </tr>
                                    )
                                }) }
                            </tbody> : null }
                    </table> 
                    </div>
            </div>
        </>
    )
}

export default SalesManagement