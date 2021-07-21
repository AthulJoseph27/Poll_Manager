import React from "react";
import SignUp from "./Components/SignUp";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Home from './Components/Home';
import ActivePolls from './Components/ActivePolls';
import FinishedPolls from './Components/FinishedPolls';
import Poll from "./Components/Poll";
import CreateNewPoll from './Components/CreateNewPoll';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/create-new-poll" component={CreateNewPoll} />
            <Route path="/poll/:id" component={Poll} />
            <Route exact path="/" component={Home} />
            <Route path="/active-polls" component={ActivePolls} />
            <Route path="/finished-polls" component={FinishedPolls} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App
