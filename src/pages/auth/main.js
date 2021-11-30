import "./login.css";
import { BrowserRouter as Router, Route,Switch , Link} from "react-router-dom";
const Main = () => {
    return ( <div className="not-auth">
        <h1>Not Authorized</h1>
            <p>Please Login to Continue</p>
            <Link to="/login" > <h4 className="linkBtn">Login</h4></Link>
    </div> );
}
 
export default Main;