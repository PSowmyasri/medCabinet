import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './screens/Home'
import Register from './screens/Register'
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/register" component={Register} />

          <Route exact path="/login" component={Login} />

        </Switch>
      </main>
    </Router>
  );
}

export default App;