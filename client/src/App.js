import React from 'react';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import SingUp from './components/auth/SingUp';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/authentication/authState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/privateRoute';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


// Check if a token exists
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    <ProjectState>
      <TaskState> 
        <AlertState>
          <AuthState>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/singup" component={SingUp} />
                    <PrivateRoute exact path="/projects" component={Projects} />

                </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
