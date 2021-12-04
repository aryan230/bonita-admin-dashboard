import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { dividerClasses } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export const DialogueTable = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const TableRowProduct = (props) => {
  console.log(props)
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const editBtnClick = async () => {
    window.location("/user/edit");
  };
  const deleteBtnClick = async () => {
    if (window.confirm("Are you sure")) {
      console.log(
        `https://postman365.herokuapp.com/api/category/${props.users.key}`
      );
      fetch(
        `https://apiadminpanel.herokuapp.com/api/product/${props.users.key}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          window.location.replace("/");
          console.log(res);
        });
    } else {
      // They clicked no
    }
  };
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell component="th" scope="row">
      {props.users.title}
    </TableCell>
    <TableCell align="right">
      <Chip label={props.users.category} color="success" size="small" />
    </TableCell>
    <TableCell align="right">{props.users.price}/-</TableCell>
    <TableCell align="right">{props.users.size}</TableCell>
    <TableCell align="right">{props.users.color}</TableCell>
    <TableCell align="right">
    <img src={props.users.image}></img>
    </TableCell>
    <TableCell align="right" sx={{width: 1/4}}>
        {props.users.about}
    </TableCell>
    <TableCell align="right">
        <Link to={`/banner/edit/${props.users.key}`} className="links">
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
        </Link>
      </TableCell>
    <TableCell align="right">
        <IconButton aria-label="delete" size="large" onClick={deleteBtnClick}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
  </TableRow>
  );
};
