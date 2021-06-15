
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home/Home';
import SignUp from './components/Signup/SignUp';
import Login from './components/Login/Login';
import Web from './components/Web/Web';
import Tree from './components/Views/Tree/Tree';
import Settings from './components/Settings/Settings';
import Profile from './components/Profile/Profile';
import Help from './components/Help/Help';
import PrivateRoute from './PrivateRoute';
import Forgot from './components/Forgot/Forgot';
import Pro from './components/Pro/Pro';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp}/>
          <Route path="/login" component={Login}/>
          <Route path="/forgot-password" component={Forgot} />
          <PrivateRoute path="/web/view=board" component={Web} />
          <PrivateRoute path="/web/view=tree" component={Tree} />
          <Route path="/settings" component={Settings} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/help-center" component={Help} />
          <Route path="/pro" component={Pro} />
        </Switch>
      </AuthProvider>
    </Router>


  );
}

export default App;
