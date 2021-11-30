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
import { TableRowTrans } from "./tableRowTrans";
// import { TableRowCat } from "./tableRowCat";
// import { TableRowUser, DialogueTable } from "./tableRow";

function createData(title, key, id, cod, date ,amount, deleteCat) {
  return { title, key, id, cod, date, amount, deleteCat };
}

const AllTransactions = () => {
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
        await axios.get(`https://apiadminpanel.herokuapp.com/api/transaction
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
            `${element._id}`,
            `${element.payment_mode}`,
            `${element.transacton_date}`,
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

  return (
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
            <TableCell align="right">COD/Online</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>      
          {usersRow.map((row) => (
         <TableRowTrans users={row}/>
        ))}
        
          {/* <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              #2456
            </TableCell>
            <TableCell align="right">
              <Chip label="test" color="success" size="small" />
            </TableCell>
            <TableCell align="right">22/11/2021</TableCell>
            <TableCell align="right">
             2000/-
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
  );
};

export default AllTransactions;
