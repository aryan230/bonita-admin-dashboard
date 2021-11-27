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
// import Meta from "./meta";

const EditTransactions = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [isVerified, setisVerified] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  let [metaFeilds, setMetaFeilds] = useState([]);
  let [key, setKey] = useState("");
  let [value, setValue] = useState("");
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
        Category Created Sucessfully
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
    if (slug == "") {
      setNameError(true);
    }
    if (number == undefined) {
      setNumberError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if (name && slug) {
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
        title: name.toString(),
        slug: slug,
        sortOrder: number,
        parent: "",
        metafeilds: metaFeilds,
      };
      console.log(userData);
      try {
        const res = await axios.post(
          "https://postman365.herokuapp.com/api/category",
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

  const addButtonClicked = (e) => {
    e.preventDefault();
    let metaFeilsArray = metaFeilds;
    console.log(metaFeilsArray);
    let keyValueObject = {
      key: key,
      value: value,
    };
    setMetaFeilds(metaFeilsArray);
    // display();
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
          Edit Transactions
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
          label="Slug"
          id="fullWidth"
          variant="outlined"
          margin="normal"
          helperText="Must be unique, all small letter, no space. Example - test-category"
          error={emailError}
          onChange={(e) => setSlug(e.target.value)}
        />
        <br />
        <TextField
          required
          fullWidth
          label="Sort Order"
          placeholder={1}
          id="fullWidth"
          variant="outlined"
          type="number"
          margin="normal"
          error={numberError}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <br />
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Parent</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Roles"
            onChange={(event) => selectChange(event)}
          >
            {/* <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"customer"}>Customer</MenuItem>
            <MenuItem value={"vendor"}>Vendor</MenuItem> */}
          </Select>
        </FormControl>
        <br />

        <Box component="span" sx={{ p: 2, boxShadow: 10, width: 1 }}>
          <Typography variant="h6" component="div" gutterBottom sx={{ m: 2 }}>
            Meta Feilds
          </Typography>
          {/* {display()} */}
          {/* {metaFeilds.map((ele) => (
            <Meta data={ele} />
          ))} */}
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
              onChange={(e) => setValue(e.target.value)}
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

export default EditTransactions;
