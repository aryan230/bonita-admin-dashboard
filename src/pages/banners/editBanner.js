import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
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
import FormLabel from '@mui/material/FormLabel';
import { CardTravel } from "@mui/icons-material";
import FormGroup from '@mui/material/FormGroup';
import { useParams } from "react-router";
import SelectTwo from 'react-select';
import makeAnimated from 'react-select/animated';
import Chip from '@mui/material/Chip';

const EditBanners = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState();
  const [color , setColor] = useState([]);
  const [size , setSize] = useState([]);
  const [slug, setSlug] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [isVerified, setisVerified] = useState(false);
  const [image, SetImageLink] = useState();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  let [key, setKey] = useState("");
  let [value, setValue] = useState("");
  let [metaFeilds, setMetaFeilds] = useState([]);
  const { id } = useParams();
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
        Product Created Sucessfully
      </Alert>
    );
  };

  const [categories , setCategories] = useState([]);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const animatedComponents = makeAnimated();

  useEffect(async () => {
    setOpenBackdrop(true);
    try {
      const response = await axios.get(
        `https://apiadminpanel.herokuapp.com/api/product/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        handleCloseBackdrop();
        let data = response.data.data;
        console.log(response.data.data);
        setName(data.title);
        setDes(data.description)
        SetImageLink(data.image)
        setNumber(data.sortOrder)
        setColor(data.variations.color)
        setSelect(data.category)
        setSize(data.variations.size)
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


  useEffect( async () => {
    try {
      const response = await axios.get(
        `https://apiadminpanel.herokuapp.com/api/category`
      );
      console.log(response);
      if (response.status === 200) {
        handleCloseBackdrop();
        let insideCat = [];
        let data = response.data.data;
        console.log(data);
        data.forEach(element => {
          insideCat.push(element.title);
        });
        setCategories(insideCat);
        // let data = response.data.data;
        // console.log(response.data.data);
        // setName(data.name);
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
    if (number == undefined) {
      setNumberError(true);
    }
    if (name) {
      setNameError(false);
      setNameError(false);
      setNumberError(false);
      setPasswordError(false);
      setOpenBackdrop(true);
      console.log("Not empty");
      setAlertError(false);
      console.log(color);
      // {
      //   name: "aryan",
      //   email: "email@email.com",
      //   role: "admin",
      //   password: "password.toString()",
      //   mobileNumber: Number(number),
      //   mobileVerified: true,
      // }
    //   let userData = {
    //     "title": name ,
    //     "description": des,
    //     "sortOrder": number,
    //     "variations": {
    //         "color": "White",
    //         "size": "40"
    //     },
    //     "category":"xyz",
    //     "total_price": 240
    // }
      // let userData = {
      //   "title" : `${name}`,
      //   "description": `${des}`,
      //   "sortOrder": number,
      //   "category": "test",
      //   "total_price": Number(price),
      //   "image": image,
      //   "variations": {
      //     "color" : "Blue",
      //     "size":  `${size}`
      //   }
      // };
    //   let userData = {
    //     "title": name,
    //     "description": des,
    //     "sortOrder": number,
    //     "variations": {
    //         "color": "White",
    //         "size": "40"
    //     },
    //     "category": "xyz",
    //     "total_price": price
    // }

    let userData = {
      "title": name,
      "description": des,
      "sortOrder": number,
      "image": image,
      "variations": {
          "color": color,
          "size": size
      },
      "category": select,
      "total_price": price
  }
      console.log(userData);
      try {
        const res = await axios.put(
          `https://apiadminpanel.herokuapp.com/api/product/${id}`,
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

  let items = [];
  let addMetaFeilds = () => {};
  const addButtonClicked = (e) => {
    e.preventDefault();
    console.log("CLICKED");
    // let metaFeilsArray = metaFeilds;
    // console.log(metaFeilsArray);
    // let keyValueObject = {
    //   key: key,
    //   value: value,
    // };
    // metaFeilsArray.push(keyValueObject);
    // setMetaFeilds(metaFeilsArray);
    // // display();
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
          Edit Product - {name}
        </Typography>
        {/* <SelectTwo sx={{w:1}}
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[options[4], options[5]]}
      isMulti
      options={options}

      onChange={(e) => {setColor(e.target.value)
      }}
    /> */}
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
          placeholder = {name}
        />
        <br />
        <TextField
          required
          fullWidth
          label="Enter Description"
          id="fullWidth"
          variant="outlined"
          margin="normal"
          error={nameError}
          onChange={(e) => setDes(e.target.value)}
          placeholder = {name}
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
        <FormControl component="fieldset"  >
      <FormLabel component="legend">Select Color</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="White"
          control={<Checkbox />}
          label="White"
          labelPlacement="end"
          onChange={(e) => color.push(e.target.value)}
        />
        <FormControlLabel
          value="Red"
          control={<Checkbox />}
          label="Red"
          labelPlacement="end"
          onChange={(e) => color.push(e.target.value)}
        />
        <FormControlLabel
          value="Black"
          control={<Checkbox />}
          label="Black"
          labelPlacement="end"
          onChange={(e) => color.push(e.target.value)}
        />
        <FormControlLabel
          value="Blue"
          control={<Checkbox />}
          label="Blue"
          labelPlacement="end"
          onChange={(e) => color.push(e.target.value)}
        />
            <FormControlLabel
          value="Yellow"
          control={<Checkbox />}
          label="Yellow"
          labelPlacement="end"
          onChange={(e) => color.push(e.target.value)}
        />
      </FormGroup>
    </FormControl>
        {/* <FormControl component="fieldset" onChange={(e) => {setColor(e.target.value)
      }}>
      <FormLabel component="legend" >Color</FormLabel>
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="White" control={<Radio />} label="White" />
        <FormControlLabel value="Red" control={<Radio />} label="Red" />
        <FormControlLabel value="Black" control={<Radio />} label="Black" />
        <FormControlLabel value="Blue" control={<Radio />} label="Blue" />
        <FormControlLabel value="Yellow" control={<Radio />} label="Yellow" />

      </RadioGroup>
    </FormControl> */}
    <br/>
    <FormControl component="fieldset"  >
      <FormLabel component="legend">Select Size</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="36"
          control={<Checkbox />}
          label="36"
          labelPlacement="end"
          onChange={(e) => size.push(e.target.value)}
        />
        <FormControlLabel
          value="37"
          control={<Checkbox />}
          label="37"
          labelPlacement="end"
          onChange={(e) => size.push(e.target.value)}
        />
        <FormControlLabel
          value="38"
          control={<Checkbox />}
          label="38"
          labelPlacement="end"
          onChange={(e) => size.push(e.target.value)}
        />
        <FormControlLabel
          value="39"
          control={<Checkbox />}
          label="39"
          labelPlacement="end"
          onChange={(e) => size.push(e.target.value)}
        />
            <FormControlLabel
          value="40"
          control={<Checkbox />}
          label="40"
          labelPlacement="end"
          onChange={(e) => size.push(e.target.value)}
        />
                    <FormControlLabel
          value="41"
          control={<Checkbox />}
          label="41"
          labelPlacement="end"
          onChange={(e) => size.push(e.target.value)}
        />
      </FormGroup>
    </FormControl>
    {/* <FormControl component="fieldset-two" onChange={(e) => {setSize(e.target.value)}}>
      <FormLabel component="legend-two" >Size</FormLabel>
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group-two">
        <FormControlLabel value="36" control={<Radio />} label="36" />
        <FormControlLabel value="37" control={<Radio />} label="37" />
        <FormControlLabel value="38" control={<Radio />} label="38" />
        <FormControlLabel value="39" control={<Radio />} label="39" />
        <FormControlLabel value="40" control={<Radio />} label="40" />
        <FormControlLabel value="41" control={<Radio />} label="41" />
      </RadioGroup>
    </FormControl> */}
    <br/>
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Roles"
            onChange={(event) => selectChange(event)}
          >
                      {categories.map((ele) => (
         <MenuItem value={ele}>{ele}</MenuItem>
        ))}
            {/* {categories.map()
            } */}
            {/* <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"customer"}>Customer</MenuItem>
              <MenuItem value={"vendor"}>Vendor</MenuItem> */}
          </Select>
        </FormControl>
        <br />
        <TextField
          required
          fullWidth
          label="Total Price"
          placeholder={1}
          id="fullWidth"
          variant="outlined"
          type="number"
          margin="normal"
          error={numberError}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <br/>
        {/* <div>
        <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
        </div> */}
        <TextField
          required
          fullWidth
          label="Set Image Link"
          id="fullWidth"
          variant="outlined"
          margin="normal"
          error={nameError}
          onChange={(e) => SetImageLink(e.target.value)}
        />
        
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

export default EditBanners;
