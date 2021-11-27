import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./user.css";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import Chip from "@mui/material/Chip";
const UserSettings = (props) => {
  const { id } = useParams();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [select, setSelect] = useState("none");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [isVerified, setisVerified] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  // Use Effect
  useEffect(async () => {
    setOpenBackdrop(true);
    try {
      const response = await axios.get(
        `https://postman365.herokuapp.com/api/user/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        handleCloseBackdrop();
        let data = response.data.data;
        console.log(response.data.data);
        setName(data.name);
        setEmail(data.email);
        setNumber(data.mobileNumber);
      } else {
        handleCloseBackdrop();
        console.log("ID Does not Exists");
      }
    } catch (err) {
      handleCloseBackdrop();
      console.log(err);
    }
  }, []);

  //Errors
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  //Functions
  const alertShowerError = (msg) => {
    return (
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="error"
        sx={{ width: "100%" }}
      >
        There was some error
      </Alert>
    );
  };
  const alertShowerSucess = (message) => {
    return (
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="success"
        sx={{ width: "100%" }}
      >
        User Updated Sucessfully
      </Alert>
    );
  };

  const saveBtnClicked = async () => {
    console.log("Clicked");
    setOpenBackdrop(true);
    let userData = {
      name: name.toString(),
      email: email.toString(),
      mobileNumber: Number(number),
    };

    console.log(userData);
    try {
      const res = await axios.put(
        `https://postman365.herokuapp.com/api/user/${id}`
      );
      console.log(res);

      if (res.status == "200") {
        handleCloseBackdrop();
        setAlert(true);
        alertShowerSucess("Account Created Sucess");
        console.log(res.data.message);
      } else {
        setAlertError(true);
        alertShowerError("Error");
        handleCloseBackdrop();
      }
    } catch (error) {
      setAlertError(true);
      alertShowerError("Error");
      handleCloseBackdrop();
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: " 2.25rem 2.25rem 0.75rem ",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="user">
        <Typography variant="h4" component="div" gutterBottom>
          Your Details
          {/* <Chip label="admin" color="success" size="large" /> */}
        </Typography>
        {alertError && alertShowerError()}
        {alert && alertShowerSucess()}
        <TextField
          required
          fullWidth
          label="Enter Name"
          placeholder={name}
          defaultValue={name}
          id="fullWidth"
          variant="outlined"
          margin="normal"
          error={nameError}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <TextField
          required
          fullWidth
          label="Enter Your Email Adress"
          id="fullWidth"
          variant="outlined"
          placeholder={email}
          margin="normal"
          error={emailError}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          required
          fullWidth
          label="Mobile Number"
          id="fullWidth"
          variant="outlined"
          margin="normal"
          error={numberError}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <FormControlLabel control={<Checkbox />} label="Mobile Verified?" />
        <br />
        <TextField
          fullWidth
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          error={passwordError}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <br />
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Roles</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Roles"
            onChange={(event) => selectChange(event)}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem>
            <MenuItem value={"vender"}>Vender</MenuItem>
          </Select>
        </FormControl> */}
        <br />
        <Button
          variant="contained"
          size="large"
          margin="normal"
          onClick={saveBtnClicked}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};

export default UserSettings;
