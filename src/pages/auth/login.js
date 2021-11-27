import { useState } from "react";
import "./login.css";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        window.location.replace('/dash')

      } else {
        console.log('SOME ERROR')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="auth">
      <h1>Login</h1>
      <p>Hello! Log in with your email</p>
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
      </form>
    </div>
  );
};

export default LoginPage;
