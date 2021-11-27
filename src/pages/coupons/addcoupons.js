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
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { width } from "@mui/system";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaCoupons from "./MetaCoupons";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
// import Meta from "./meta";

const CouponsForm = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [isVerified, setisVerified] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [reward, setReward] = useState();
  const [value, setValue] = useState();

  //Errors
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  let [key, setKey] = useState("");
  let [valuePair, setValuePair] = useState("");
  let [addedPair, setAddedPair] = useState(false);
  let [metaFeilds, setMetaFeilds] = useState([]);
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
        Coupon Created Sucessfully
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
    if (details == "") {
      setNameError(true);
    }
    if (number == undefined) {
      setNumberError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if (name && details) {
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
        title: name.toString(),
        detail: details,
        code: number,
        type: select.toString(),
        reward: reward,
        expiresAt: value,
        metafeilds: metaFeilds,
      };
      console.log(userData);
      try {
        const res = await axios.post(
          "https://postman365.herokuapp.com/api/coupon",
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

  //MetaFeilds

  //Display Function

  //   const display = () => {
  //     return metaFeilds.map((ele, metaFeilds) => (
  //       <Meta data={ele} array={metaFeilds} />
  //     ));
  //   };

  const addButtonClicked = async (e) => {
    setAddedPair(true);
    console.log("CLICKED");
    let array = metaFeilds;
    e.preventDefault();
    let keyValueObject = {
      key: key,
      value: valuePair,
    };
    await array.push(keyValueObject);
    await setMetaFeilds(array);
    console.log(metaFeilds);
    setAddedPair(false);
  };

  const deletBtnClick = (event) => {
    console.log(event.target);
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
          Add Coupons
        </Typography>
        {alertError && alertShowerError()}
        {alert && alertShowerSucess()}
        <TextField
          required
          fullWidth
          label="Enter Title"
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
          label="Details"
          id="fullWidth"
          variant="outlined"
          margin="normal"
          // helperText="Must be unique, all small letter, no space. Example - test-category"
          error={emailError}
          onChange={(e) => setDetails(e.target.value)}
        />
        <br />
        <TextField
          required
          fullWidth
          label="Code"
          id="fullWidth"
          variant="outlined"
          margin="normal"
          error={numberError}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Roles"
            onChange={(event) => selectChange(event)}
          >
            <MenuItem value={"fixed"}>fixed</MenuItem>
            <MenuItem value={"percent"}>percent</MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField
          required
          fullWidth
          label="Reward"
          id="fullWidth"
          variant="outlined"
          margin="normal"
          type="number"
          error={numberError}
          onChange={(e) => setReward(Number(e.target.value))}
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            fullWidth
            margin="normal"
            label="Expires At"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br />
        <Box component="span" sx={{ p: 2, boxShadow: 10, width: 1 }}>
          <Typography variant="h6" component="div" gutterBottom sx={{ m: 2 }}>
            Meta Feilds
          </Typography>
          {/* {metaFeilds.map((ele, index) => (
            <MetaCoupons data={ele} array={index} />
          ))} */}
          {metaFeilds.map((ele, index) => (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ m: 2 }}
              key={index}
              id={index}
            >
              <TextField
                sx={{ width: 1 / 2 }}
                disabled
                label={ele.key}
                id="fullWidth"
                variant="outlined"
              />
              <TextField
                sx={{ width: 1 / 2 }}
                disabled
                label={ele.value}
                id="fullWidth"
                variant="outlined"
              />
              {/* <Button
          variant="contained"
          size="large"
          margin="normal"
          // onClick={saveBtnClicked}
        >
          Add
        </Button> */}
              <IconButton
                aria-label="delete"
                size="large"
                onClick={deletBtnClick}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <TextField
              sx={{ width: 1 / 2 }}
              required
              label="Enter Key"
              id="fullWidth"
              variant="outlined"
              error={nameError}
              onChange={(e) => setKey(e.target.value)}
            />
            <TextField
              sx={{ width: 1 / 2 }}
              required
              label="Enter Value"
              id="fullWidth"
              variant="outlined"
              error={nameError}
              onChange={(e) => setValuePair(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              margin="normal"
              onClick={addButtonClicked}
            >
              Add
            </Button>
            {/* <IconButton aria-label="delete" size="large">
              <DeleteIcon />
            </IconButton> */}
          </Stack>
        </Box>
        <br />
        <Button
          variant="contained"
          size="large"
          margin="normal"
          onClick={saveBtnClicked}
          sx={{ m: 5 }}
        >
          Save
        </Button>
      </div>
    </Box>
  );
};

export default CouponsForm;
