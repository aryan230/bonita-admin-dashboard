import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Domain, Light } from "@mui/icons-material";
import "./sidedrawer.css";
import Map from "../map";
import ChartC from "../chart";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  marginTop: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    width: `calc(100% - ${0}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [color, setcolor] = React.useState("Light");
  const [nestedOpen, setnestedOpen] = React.useState(true);

  const handleChange = (event) => {
    setcolor(event.target.value);
  };
  const handleClick = () => {
    setnestedOpen(!nestedOpen);
  };

  const handleDrawer = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listClick = (e) => {
    console.log(e.target);
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        padding: " 2.25rem 2.25rem 0.75rem ",
      }}
    >
      <DrawerHeader />

      <div className="activeorder">
        <div className="header">Active orders</div>
        
      </div>
      <div className="orders">
        <div className="header">ORDERS</div>
        <div className="month">
          <div>
            <div className="info"> Total </div>
            <div className="text"> 6</div>
          </div>
          <div>
            <div className="info"> Last Month </div>
            <div className="text"> 6</div>
          </div>
          <div>
            <div className="info"> Last Week </div>
            <div className="text"> 2</div>
          </div>
          <div>
            <div className="info"> Today </div>
            <div className="text"> 0</div>
          </div>
        </div>
        <div className="chartsection">
          <div className="chartmainsection">
            <div className="label0">
              {" "}
              <div className="label">
                <div
                  className="color"
                  style={{ backgroundColor: "rgb(255, 170, 0)" }}
                ></div>
                <div className="text"> Complete</div>
              </div>
              <div className="label">
                <div
                  className="color"
                  style={{ backgroundColor: "rgb(51, 102, 255)" }}
                ></div>
                <div className="text">Other</div>
              </div>
              <div className="label">
                <div
                  className="color"
                  style={{ backgroundColor: "rgb(0, 215, 143)" }}
                ></div>
                <div className="text"> All</div>
              </div>
            </div>
            <div className="select">
              <FormControl sx={{ m: 1, minWidth: 96, height: "40px" }}>
                <Select
                  sx={{ width: 96, height: "40px" }}
                  value={color}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue={Light}
                >
                  <MenuItem value={"Light"} defaultValue>
                    Week
                  </MenuItem>
                  <MenuItem value={"Dark"}>Month</MenuItem>
                  <MenuItem value={"Cosmic"}>Year</MenuItem>
                  <MenuItem value={"Corporate"}>All</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="chart " style={{ height: "400px" }}>
            <ChartC />
          </div>
        </div>
      </div>
      <div className="activemain">
        <div className="simple">
          <div className="activity">
            <div className="text1">User Activity</div>
            <div className="select" style={{ marginBottom: "auto" }}>
              <FormControl sx={{ m: 1, minWidth: 96, height: "40px" }}>
                <Select
                  sx={{ width: 96, height: "40px" }}
                  value={color}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue={Light}
                >
                  <MenuItem value={"Light"} defaultValue>
                    Week
                  </MenuItem>
                  <MenuItem value={"Dark"}>Month</MenuItem>
                  <MenuItem value={"Cosmic"}>Year</MenuItem>
                  <MenuItem value={"Corporate"}>All</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="simplesub">
          <div className="innersub" style={{ textAlign: "left" }}>
            <div className="text011">Today's Revenue</div>
            <div className="h3">0</div>
            <div className="progressbar"></div>
            <div className="caption">No change since yesterday</div>
            <div className="text011 m3">Today's Order</div>
            <div className="h3">0</div>
            <div className="progressbar"></div>
            <div className="caption">No change since yesterday</div>
            <div className="text011 m3">Today's Distance</div>
            <div className="h3">0</div>
            <div className="progressbar"></div>
            <div className="caption">No change since yesterday</div>
          </div>
        </div>
      </div>
      <div className="orders">
        <div className="header">USERS</div>
        <div className="month">
          <div>
            <div className="info"> Total </div>
            <div className="text"> 26</div>
          </div>
          <div>
            <div className="info"> Last Month </div>
            <div className="text"> 10</div>
          </div>
          <div>
            <div className="info"> Last Week </div>
            <div className="text"> 0</div>
          </div>
          <div>
            <div className="info"> Today </div>
            <div className="text"> 0</div>
          </div>
        </div>
        <div className="chartsection">
          <div className="chartmainsection">
            <div className="label0">
              {" "}
              <div className="label">
                <div
                  className="color"
                  style={{ backgroundColor: "rgb(0, 215, 143)" }}
                ></div>
                <div className="text"> New Registrations</div>
              </div>
            </div>
            <div className="select">
              <FormControl sx={{ m: 1, minWidth: 96, height: "40px" }}>
                <Select
                  sx={{ width: 96, height: "40px" }}
                  value={color}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue={Light}
                >
                  <MenuItem value={"Light"} defaultValue>
                    Week
                  </MenuItem>
                  <MenuItem value={"Dark"}>Month</MenuItem>
                  <MenuItem value={"Cosmic"}>Year</MenuItem>
                  <MenuItem value={"Corporate"}>All</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="chart " style={{ height: "400px" }}>
            <ChartC />
          </div>
        </div>
      </div>
    </Box>
  );
}
