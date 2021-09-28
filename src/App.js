import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Switch , Route } from "react-router-dom"

import Dashboard_main from './components/dashboard/Dashboard_main.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route path='/' component={ Dashboard_main }  exact />
            <Route path='/dashboard' component={ Dashboard_main }  />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
