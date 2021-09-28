import React from 'react';

//routes

import { Switch , Route} from 'react-router-dom';

//styles

import './dashboard.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages

import Customer from './list_customer';
import AddCustomer from './add_customer';
import Employee from './list_employee';
import AddEmployee from './add_employee';
import Supplier from './list_supplier';
import AddSupplier from './add_supplier';
import AddProduct from './add_product';
import Product from './list_product';
import Dashboard from './dashboard';
import Invoice from './add_invoice';
import ListInvoice from './listInvoice';
import ListPurchase from './listPurchase';
import Area from './areaManagement'
import EmployeeType from './salesMnagement'
import EditCustomer from './edit_customer'
import EditEmployee from './edit_employee'
import EditProduct from './edit_product'
import AddPurchase from './add_purchase';

function Maincont() {
    return(
        <div className="mainContCart">
            <Switch>
                <Route path="/" exact>
                    <Dashboard />
                </Route>
                <Route path="/" exact>
                    <Dashboard />
                </Route>
                <Route path="/medcare" exact>
                    <Dashboard />
                </Route>
                <Route path="/dashboard" exact>
                    <Dashboard />
                </Route>
                <Route path="/dashboard/Customer" exact>
                    <Customer />
                </Route>
                <Route path="/dashboard/editCustomer/:id" exact>
                    <EditCustomer />
                </Route>
                <Route path="/dashboard/editEmployee/:id" exact>
                    <EditEmployee />
                </Route>
                <Route path="/dashboard/Customer/AddCustomer">
                    <AddCustomer />
                </Route>
                <Route path="/dashboard/Employee" exact>
                    <Employee />
                </Route>
                <Route path="/dashboard/Employee/AddEmployee">
                    <AddEmployee />
                </Route>
                <Route path="/dashboard/Supplier" exact>
                    <Supplier />
                </Route>
                <Route path="/dashboard/Supplier/AddSupplier" >
                    <AddSupplier />
                </Route>
                <Route path="/dashboard/Product" exact>
                    <Product />
                </Route>
                <Route path="/dashboard/Product/AddProduct" >
                    <AddProduct />
                </Route>
                <Route path="/dashboard/editMedicine/:id" exact >
                    <EditProduct />
                </Route>
                <Route path="/dashboard/Purchase" >
                    <AddPurchase />
                </Route>
                <Route path="/dashboard/Invoice" >
                    <Invoice />
                </Route>
                <Route path="/dashboard/listinvoice" >
                    <ListInvoice />
                </Route>
                <Route path="/dashboard/listpurchase" >
                    <ListPurchase />
                </Route>
                <Route path="/dashboard/Area" >
                    <Area />
                </Route>
                <Route path="/dashboard/EmployeeType" >
                    <EmployeeType />
                </Route> 
            </Switch>
        </div>
    )
}

export default Maincont;
