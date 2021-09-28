import React from 'react';

function ListCustomerData({ datas , onActionClick }) {

    return (
        <>
        <div className="table-responsive tablePart">
           <table className="table table-bordered table-hover table-striped">
            <thead style={{'backgroundColor':'#61DAFB'}} >
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Secondary</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { datas.map((itm,k) => {
                    let id = itm.id;
                    return ( 
                    <tr>
                        <td>{ k+1 }</td>
                        <td>{ itm.name }</td>
                        <td>{ itm.contact }</td>
                        <td>{ itm.email }</td>
                        <td>{ itm.s_contact }</td>
                        <td>{ itm.address }</td>
                        <td><button type="button" onClick = {() => { onActionClick(id) }} className="btn btn-danger btn-sm" key={k}>Delete</button></td>
                    </tr>
                    )
                }) }
            </tbody>
           </table> 
        </div>
        </>
    )
}

export default ListCustomerData
