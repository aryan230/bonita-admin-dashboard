import { useState } from "react";
import "./login.css";
import axios from "axios";
import { BrowserRouter as Router, Route,Switch , Link} from "react-router-dom";
import Cookies from 'js-cookie'

// let user = localStorage.getItem('role');
// if(user != undefined){
//   window.location = 'http://localhost:3000/'
// }
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const loginBtnClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://apiadminpanel.herokuapp.com/api/auth/login",
        {
          email: email,
          password: password
        }
      );
      console.log(res);
      if (res.status == "200") {
        console.log(res.data.user.role);
        localStorage.setItem('role',res.data.user.role)
        // Cookies.set('token', res.data.token)
        // window.location.replace('/')
        setSucess(true);
        setError(false)
        

      } else {
        console.log('SOME ERROR')
        setError(true)
        setSucess(false);
      }
    } catch (error) {
      console.log(error)
      setError(true)
      setSucess(false);
    }
    try {
      const res = await axios.post(
        "https://apiadminpanel.herokuapp.com/api/dummy",
        {}
      );
      console.log(res);
        
      if (res.status == "200") {
        console.log('SOMETHING')
      } else {
        console.log('SOME ERROR')

      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="mainContent">
    <div className="auth">
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email address: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
       
        <input type="submit" value="LOG IN" className="btn" onClick={loginBtnClick}/>
        <Link to="/register" ><h4 className="linkBtn">Or SignUp</h4></Link>
        {sucess && ( <h2 className="sucess">Login Sucess... Redirecting</h2>)}
       {error && ( <h2 className="error">There was some error</h2>)}
       
      </form>
    </div>
    </div>

  );
};

export default LoginPage;
