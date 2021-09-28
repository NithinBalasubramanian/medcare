import React from 'react';
import { useHistory } from "react-router-dom";

function ListProductData({ datas , onActionClick }) {

    const history = useHistory();

    return (
        <>
        <div className="table-responsive tablePart">
           <table className="table table-bordered table-hover table-striped">
            <thead style={{'backgroundColor':'#61DAFB'}} >
                <tr>
                    <th>S.No</th>
                    <th>Product</th>
                    <th>Scientific name</th>
                    <th>Piece per box</th>
                    <th>Price per piece</th>
                    <th>Price per box</th>
                    <th>Sell Price</th>
                    <th>Expire Date</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((itm, k) => { 
                    let id = itm.id;
                    return(
                    <tr>
                        <td>{ k+1 }</td>
                        <td>{ itm.product_name }</td>
                        <td>{ itm.s_name }</td>
                        <td>{ itm.piece_per_box }</td>
                        <td>{ itm.price_per_piece }</td>
                        <td>{ itm.price_per_box }</td>
                        <td>{ itm.sell_rate }</td>
                        <td>{ itm.exp_date }</td>
                        <td>{ itm.count }</td>
                        <td>
                            <button type="button" onClick = {() => { onActionClick(id) }} className="btn btn-danger btn-sm" key={k}>Delete</button>
                            <button type="button" onClick = { () => { history.push(`/dashboard/editMedicine/${itm.id}`)}} className="btn btn-sm btn-warning">Edit</button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
           </table> 
        </div>
        </>
    )
}

export default ListProductData
