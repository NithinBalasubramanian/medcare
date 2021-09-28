import React from 'react';
import { useHistory } from "react-router-dom";

function ListPurchaseTable({ datas , onActionClick }) {

    const history = useHistory();

    return (
        <>
        <div className="table-responsive tablePart">
           <table className="table table-bordered table-hover table-striped">
            <thead style={{'backgroundColor':'#61DAFB'}} >
                <tr>
                    <th>S.No</th>
                    <th>Invoice Id</th>
                    <th>Supplier</th>
                    <th>Grand Total</th>
                    <th>Date</th>
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
                            <td>{ itm.inv_id }</td>
                            <td>{ itm.name }</td>
                            <td>{ itm.grand_total }</td>
                            <td>{ itm.date_created }</td>
                            <td>
                                <button type="button" onClick = {() => { onActionClick(id) }} className="btn btn-danger btn-sm" key={k}>Delete</button>
                                <button type="button" onClick = { () => { history.push(`/dashboard/purchase?invoice=${itm.id}`)}} className="btn btn-sm btn-warning">Edit</button>
                                <button type="button" onClick = { () => { history.push(`/dashboard/purchase?invoice=${itm.id}`)}} className="btn btn-sm btn-success">View</button>
                            </td>
                        </tr>
                        )
                    }) }
                </tbody> : null }
           </table> 
        </div>
        </>
    )
}

export default ListPurchaseTable
