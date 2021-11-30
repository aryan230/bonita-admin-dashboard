import { useState } from "react";
import "./login.css";
import axios from "axios";
import { BrowserRouter as Router, Route,Switch , Link} from "react-router-dom";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [number , setNumber] = useState();
  const [name, setName] = useState();
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const loginBtnClick = async (e) => {
    e.preventDefault();
    // let userData =         {
    //   "email": email,
    //   "password": password.toString(),
    //   "phone": Number(number),
    //   "mobileVerified":true,
    //   "name": name.toString(),
    //   "role": "admin"
    // }

    let userData = {
      "name": `${name}`,
      "email":`${email}`,
      "phone": Number(number),
      "mobileVerified":true,
      "password": `${password}`,
      "role":"customer"
  }
    console.log(userData)
    try {
      const res = await axios.post(
        "https://apiadminpanel.herokuapp.com/api/auth/register",
        userData

      );
      console.log(res);

      if (res.status == "200") {
        console.log(res.data.user.role);
        localStorage.setItem('role',res.data.user.role)
        // localStorage.setItem('User', true);
        window.location.replace('/')
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
  }
  return (
    <div className="mainContent">
    <div className="auth">
      <h1>Sign Up</h1>
      <form>
      <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="number">Number: </label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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
        <input type="submit" value="Sign Up" className="btn" onClick={loginBtnClick}/>
        <Link to="/login" > <h4 className="linkBtn">Or Login</h4></Link>
        {sucess && ( <h2 className="sucess">Login Sucess... Redirecting</h2>)}
       {error && ( <h2 className="error">There was some error</h2>)}
       
      </form>
    </div>
    </div>

  );
};

export default SignUpPage;
