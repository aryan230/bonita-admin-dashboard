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
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CreateUser = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [isVerified, setisVerified] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //Errors
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
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
        User Created Sucessfully
      </Alert>
    );
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  let saveBtnClicked = async (event) => {
    event.preventDefault();
    setOpenSnack(true);
    if (name == "") {
      setNameError(true);
    }
    if (email == "") {
      setNameError(true);
    }
    if (number == undefined) {
      setNumberError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if (name && email) {
      setNameError(false);
      setNameError(false);
      setNumberError(false);
      setPasswordError(false);
      setOpenBackdrop(true);
      console.log("Not empty");
      setAlertError(false);
      // {
      //   name: "aryan",
      //   email: "email@email.com",
      //   role: "admin",
      //   password: "password.toString()",
      //   mobileNumber: Number(number),
      //   mobileVerified: true,
      // }
      let userData = {
        "name":name,
        "email":email,
        "phone": Number(number),
        "mobileVerified":true,
        "password": password.toString(),
        "role": "admin"
    };
      console.log(userData);
      try {
        const res = await axios.post(
          "https://apiadminpanel.herokuapp.com/api/user",
          userData
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
    } else {
      console.log("Empty");
      setAlertError(true);
      alertShowerError("Error");
    }
  };

  const selectNameChange = (event) => {};
  const selectChange = (event) => {
    console.log(event.target.value);
    setSelect(event.target.value);
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
          Add User
        </Typography>
        {alertError && alertShowerError()}
        {alert && alertShowerSucess()}
        <TextField
          required
          fullWidth
          label="Enter Name"
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
        <br />
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
            <MenuItem value={"vendor"}>Vendor</MenuItem>
          </Select>
        </FormControl>
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

export default CreateUser;
