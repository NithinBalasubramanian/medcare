import React from 'react';

//routes

import { Switch , Route} from 'react-router-dom';

//styles

import './dashboard.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages

import Customer from './List_customer';
import AddCustomer from './Add_customer';
import Employee from './List_employee';
import AddEmployee from './Add_employee';
import Supplier from './List_supplier';
import AddSupplier from './Add_supplier';
import AddProduct from './Add_product';
import Product from './List_product';
import Dashboard from './Dashboard';
import Invoice from './Add_invoice';
import ListInvoice from './ListInvoice';
import ListPurchase from './ListPurchase';
import Area from './AreaManagement'
import EmployeeType from './SalesManagement'
import EditCustomer from './Edit_customer'
import EditEmployee from './Edit_employee'
import EditProduct from './Edit_product'
import AddPurchase from './Add_purchase';

function Maincont() {
    return(
        <div className="mainContCart">
            <Switch>
                <Route path="" exact>
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
