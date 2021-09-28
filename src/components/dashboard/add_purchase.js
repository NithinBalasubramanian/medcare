import React from 'react'
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PurchaseComponent from './purchaseComponent';

function add_purchase() {
    return (
        <>
            <div className="headerCart row">
                <h1 className="col-md-8">Add Purchase</h1>
                <div className="col-md-4">
                    <Link to="/dashboard/listpurchase" className="sideButton">
                        List Purchase
                    </Link>
                </div>
            </div>
            <div className="mainCart">
                <h1>Purchase Form</h1>
                <PurchaseComponent />
            </div>
        </>
    )
}

export default add_purchase
