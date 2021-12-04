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
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import Chip from "@mui/material/Chip";
import EditMeta from "./editMeta";
import Stack from "@mui/material/Stack";
const EditCat = (props) => {
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
  const [slug, setSlug] = useState("");
  let [metaFeilds, setMetaFeilds] = useState([]);
  let [key, setKey] = useState("");
  let [value, setValue] = useState("");
  const addButtonClicked = () => {
    let metaFeilsArray = metaFeilds;
    console.log(metaFeilsArray);
    let keyValueObject = {
      key: key,
      value: value,
    };
    metaFeilsArray.push(keyValueObject);
    setMetaFeilds(metaFeilsArray);
  };
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  // Use Effect
  useEffect(async () => {
    setOpenBackdrop(true);
    try {
      const response = await axios.get(
        `https://apiadminpanel.herokuapp.com/api/category/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        handleCloseBackdrop();
        let data = response.data.data;
        console.log(response.data.data);
        setName(data.title);
        setSlug(data.slug)
        // setEmail(data.email);
        // setNumber(data.mobileNumber);
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
        Category Updated Sucessfully
      </Alert>
    );
  };

  const saveBtnClicked = async () => {
    console.log("Clicked");
    setOpenBackdrop(true);
    let userData = {
      "title": name,
      "slug": slug
  }

    console.log(userData);
    try {
      const res = await axios.put(
        `https://apiadminpanel.herokuapp.com/api/category/${id}`,
        userData
      );
      console.log(res);

      if (res.status == "200") {
        handleCloseBackdrop();
        setAlert(true);
        alertShowerSucess("Account Created Sucess");
        console.log(res.data);
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
          Update Category - {name}
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
          placeholder={name}
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
          placeholder={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <br />

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

export default EditCat;
