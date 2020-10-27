import React from 'react';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import SingUp from './components/auth/SingUp';
import Projects from './components/projects/Projects';


import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <ProjectState>
      <TaskState> 
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/singup" component={SingUp} />
                <Route exact path="/projects" component={Projects} />

            </Switch>
        </Router>
        </TaskState>
    </ProjectState>
  );
}

export default App;
