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
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./cat.css";
import Grid from "@mui/material/Grid";
import { width } from "@mui/system";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Meta = (props) => {
  console.log(props);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ m: 2 }}
      key={props.array}
      id={props.array}
    >
      <TextField
        sx={{ width: 1 / 2 }}
        disabled
        label={props.data.key}
        id="fullWidth"
        variant="outlined"
      />
      <TextField
        sx={{ width: 1 / 2 }}
        disabled
        label={props.data.value}
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
      <IconButton aria-label="delete" size="large">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default Meta;
