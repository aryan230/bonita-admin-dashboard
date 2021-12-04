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
import './banner.css'
import { TableRowProduct } from "./tableRowCat";
// import { TableRowCat } from "./tableRowCat";
// import { TableRowUser, DialogueTable } from "./tableRow";

function createData(title, key, category, price, size , color,image, about,edit, deleteCat) {
  return { title, key,  category, price, size , color, image , about ,edit ,deleteCat };
}

const ViewBanners = () => {
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
        await axios.get(`https://apiadminpanel.herokuapp.com/api/product
      `);
      console.log(response);
      if (response.status === 200) {
        handleCloseBackdrop();
        users = response.data.data;
        console.log(users);
        let insideUsersRow = [];
        users.forEach((element) => {
          let html = createData(
            `${element.title}`,
            element._id,
            `${element.category}`,
            `${element.total_price}`,
            `${element.variations.size}`,
            `${element.variations.color}`,
            `${element.image}`,
            `${element.description}`,
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
            <TableCell>TITLE</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">About</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {usersRow.map((row) => (<TableRowProduct users={row}/>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewBanners;
