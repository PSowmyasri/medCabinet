import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import Home from './screens/Home'
import Register from './screens/Register'
import {ToastContainer} from 'react-toastify'
import Login from './screens/Login';
import User from './screens/User'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <main>
      <ToastContainer position="top-center"/>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}

          <Route exact path="/register" component={Register} />

          <Route exact path="/login" component={Login} />

          <Route exact path="/dashboard" component={User} />
          
        </Switch>
      </main>
    </Router>
  );
}

export default App;