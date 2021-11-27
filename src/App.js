import logo from "./logo.svg";
import "./App.css";
import Drawer from "./components/sidedrawer/sidedrawer";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Dashboard from "./components/appbar/appbar";
import LoginPage from "./pages/auth/login";
import { useEffect, useState } from "react";
function App() {
  const [user , setUser] = useState(false);
  // useEffect(() => {
  //   let user = localStorage.getItem("User")
  //   if(!user){
  //     setUser(true)
  //     window.location.replace('/dash');
  //   }
  // }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
          <Drawer />
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
        </Switch>
        </Router>
      
      {/* <Dashboard></Dashboard> */}
    </div>
  );
}

export default App;
