import React from 'react'
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddInvoiceForm from './AddInvoiceForm';

function Add_invoice() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Add Invoice</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/listinvoice" className="sideButton">
                        List Invoice
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Invoice Form</h1>
                <AddInvoiceForm
 />
            </div>
        </>
    )
}

export default Add_invoice
