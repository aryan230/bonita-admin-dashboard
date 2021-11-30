import logo from "./logo.svg";
import "./App.css";
import Drawer from "./components/sidedrawer/sidedrawer";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Dashboard from "./components/appbar/appbar";
import LoginPage from "./pages/auth/login";
import { useEffect, useState } from "react";
import SignUpPage from "./pages/auth/signup";
import Main from "./pages/auth/main";

let user  = localStorage.getItem('role');

function App() {
  // useEffect(() => {
  //   let user = localStorage.getItem("User")
  //   if(!user){
  //     setUser(true)
  //     window.location.replace('/dash');
  //   }
  // }, [])
  let userThere = false;
if(user != undefined){
  userThere = true;
}
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {userThere && ( <Drawer />)}
            <Main/>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/register">
            <SignUpPage></SignUpPage>
          </Route>
        </Switch>
        </Router>
      
      {/* <Dashboard></Dashboard> */}
    </div>
  );
}

export default App;
