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
import { Link } from "react-router-dom";
import { TableRowOrder } from "./tableRowOrder";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// import { TableRowCat } from "./tableRowCat";
// import { TableRowUser, DialogueTable } from "./tableRow";

function createData(title, key, slug, parent, amount, deleteCat) {
  return { title, key, slug, parent , amount , deleteCat };
}

const AllOrders = () => {
  const [alert, setAlert] = useState(false);
  const deleteBtnClick = (event) => {
    console.log.apply(event);
  };
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  let users = [];
  const [openBackdrop, setOpenBackdrop] = useState(false);

  let [usersRow, setUsersRow] = useState([]);
  useEffect(async () => {
    setOpenBackdrop(true);
    try {
      const response =
        await axios.get(`https://apiadminpanel.herokuapp.com/api/order
      `);
      console.log(response);
      if (response.status === 200) {
        handleCloseBackdrop();
        users = response.data.data;
        console.log(users);
        let insideUsersRow = [];
        users.forEach((element) => {
          let html = createData(
            `${element.item_name}`,
            element._id,
            `${element.status}`,
            `${element.user.name}`,
            `${element.total_amount}`,
            6.0,
            24
          );
          insideUsersRow.push(html);
        });
        console.log(insideUsersRow);
        setUsersRow(insideUsersRow);
        const rows = [
          createData("Frozen yoghurt", 159, 6.0, 24),
          createData("Ice cream sandwich", 237, 9.0, 37),
          createData("Eclair", 262, 16.0, 24),
          createData("Cupcake", 305, 3.7, 67),
          createData("Gingerbread", 356, 16.0, 49),
        ];
      } else {
        handleCloseBackdrop();
        console.log("ID Does not Exists");
      }
    } catch (err) {
      handleCloseBackdrop();
      console.log(err);
    }
  }, []);
  let array = usersRow.at(-1);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
//  let userData = {
//    "item_name": array.title,
//    "item_category": "category",
//    "total_amount": 500,
//    "status": array.slug
//  }

 let userData = {
  "item_name":"Order 9",
  "item_category":"Category",
  "total_amount":500,
  "status":"pending"
}
  const repeatOrderButton = async () => {
    setOpenBackdrop(true);
    console.log(userData);
    try {
      const res = await axios.get(
        "https://apiadminpanel.herokuapp.com/api/order/repeatorder"
        
      );
      console.log(res);

      if (res.status == "200") {
        handleCloseBackdrop();
        setAlert(true);
        alertShowerSucess("Account Created Sucess");
        // setAlert(true);
        // alertShowerSucess("Account Created Sucess");
        console.log(res.data.message);
      } else {
        // // setAlertError(true);
        // alertShowerError("Error");
        handleCloseBackdrop();
      }
    } catch (error) {
      // setAlertError(true);
      // alertShowerError("Error");
      handleCloseBackdrop();
      console.log(error);
    }
  }

  const alertShowerSucess = (message) => {
    return (
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="success"
        sx={{ width: "100%"}}
      >
        Order Created Sucessfully
      </Alert>
    );
  };

  return (
    <div>
    <TableContainer component={Paper}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Users</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {usersRow.map((row) => (
          <TableRowOrder users={row}/>
        ))}
          
          {/* <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              #1214
            </TableCell>
            <TableCell align="right">
              <Chip label="test" color="success" size="small" />
            </TableCell>
            <TableCell align="right">Ramesh Kumar</TableCell>
            <TableCell align="right">
           1600/-
            </TableCell>
            <TableCell align="right">
              <IconButton
                aria-label="delete"
                size="large"
                // onClick={deleteBtnClick}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
   
    <Button variant="contained" color="error" size="large" sx={{m: 5}} onClick={repeatOrderButton}>
          Repeat Last Order
        </Button>
        {alert && alertShowerSucess()}
    </div>


  );
};

export default AllOrders;
