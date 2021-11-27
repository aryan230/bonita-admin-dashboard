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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import CreateUser from "../../pages/user";
import { borderBottom } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllUsers from "../../pages/viewAllUsers";
import EditUser from "../../pages/editUser";
import CategoriesForm from "../../pages/categories/addCat.js";
import AllCategories from "../../pages/categories/viewallCat";
import EditCat from "../../pages/categories/editCat";
import LoginPage from "../../pages/auth/login";
import FlagIcon from "@mui/icons-material/Flag";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import PaymentsIcon from "@mui/icons-material/Payments";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBanners from "../../pages/banners/addBanners";
import CouponsForm from "../../pages/coupons/addcoupons";
import AllCoupons from "../../pages/coupons/viewAllCoupons";
import EditCoupons from "../../pages/coupons/editCoupons";
import DeliveryModes from "../../pages/DeliveryModes/addDeliveryModes";
import EditDeliveryModes from "../../pages/DeliveryModes/editDeliveryModes";
import AllDeliveryModes from "../../pages/DeliveryModes/viewAllDeliveryModes";
import EditTransactions from "../../pages/Transactions/editTransactions";
import AllTransactions from "../../pages/Transactions/viewAllTransactions";
import Transactions from "../../pages/Transactions/addTransactions";
import EditOrders from "../../pages/Orders/editOrders";
import Orders from "../../pages/Orders/addOrders";
import AllOrders from "../../pages/Orders/viewAllOrders";
import Vendors from "../../pages/Vendors/addVendors";
import EditVendors from "../../pages/Vendors/editVendors";
import AllVendors from "../../pages/Vendors/viewAllVendors";
import AllDeliveryProfile from "../../pages/DeliveryProfile/viewAllDeliveryProfile";
import EditDeliveryProfile from "../../pages/DeliveryProfile/editDeliveryProfile";
import DeliveryProfile from "../../pages/DeliveryProfile/addDeliveryProfile";
import ViewBanners from "../../pages/banners/viewbanner";

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

export default function SDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [color, setcolor] = React.useState("Light");
  const [nestedOpen, setnestedOpen] = React.useState(false);
  const [nestedOpenCat, setNestedOpenCart] = React.useState(false);
  const [nestedOpenBanner, setNestedOpenBanner] = React.useState(false);
  const [nestedOpenCoupons, setNestedOpenCoupons] = React.useState(false);
  const [nestedOpenDel, setNestedOpenDel] = React.useState(false);
  const [nestedOpenDelProfile, setNestedOpenDelProfile] = React.useState(false);
  const [nestedOpenVendors, setNestedOpenVendors] = React.useState(false);
  const [nestedOpenOrders, setNestedOpenOrders] = React.useState(false);
  const [nestedOpenTransactions, setNestedOpenTransactions] =
    React.useState(false);
  const handleChange = (event) => {
    setcolor(event.target.value);
  };
  const handleClick = () => {
    setnestedOpen(!nestedOpen);
  };

  const handleClickCat = () => {
    setNestedOpenCart(!nestedOpenCat);
  };

  const handleClickBanner = () => {
    setNestedOpenBanner(!nestedOpenBanner);
  };
  const handleClickCoupons = () => {
    setNestedOpenCoupons(!nestedOpenCoupons);
  };
  const handleClickDel = () => {
    setNestedOpenDel(!nestedOpenDel);
  };
  const handleClickDelProfile = () => {
    setNestedOpenDelProfile(!nestedOpenDelProfile);
  };
  const handleClickVendors = () => {
    setNestedOpenVendors(!nestedOpenVendors);
  };
  const handleClickOrders = () => {
    setNestedOpenOrders(!nestedOpenOrders);
  };

  const handleClickTransactions = () => {
    setNestedOpenTransactions(!nestedOpenTransactions);
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
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              color: " #222b45",
              boxShadow: "0 0.5rem 1rem 0 rgb(44 51 73 / 10%)",
              height: " 4.7rem",
              backgroundColor: " #fff",
              padding: "1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{
                  paddingRight: "1.25rem",
                  borderRight: "1px solid #edf1f7",
                  borderRadius: "0px",
                  height: "20px",
                  marginRight: "1.25rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  class="eva eva-menu-2-outline"
                  fill="#8f9bb3"
                >
                  <g data-name="Layer 2">
                    <g data-name="menu-2">
                      <rect
                        width="24px"
                        height="24px"
                        transform="rotate(180 12 12)"
                        opacity="0"
                      ></rect>
                      <circle cx="4" cy="12" r="1"></circle>
                      <rect
                        x="7"
                        y="11"
                        width="14"
                        height="2"
                        rx=".94"
                        ry=".94"
                      ></rect>
                      <rect
                        x="3"
                        y="16"
                        width="18"
                        height="2"
                        rx=".94"
                        ry=".94"
                      ></rect>
                      <rect
                        x="3"
                        y="6"
                        width="18"
                        height="2"
                        rx=".94"
                        ry=".94"
                      ></rect>
                    </g>
                  </g>
                </svg>
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                sx={{ fontSize: "28px", paddingRight: "1.25rem" }}
                component="div"
              >
                Admin Dashboard
              </Typography>
              {/* <FormControl sx={{ m: 1, minWidth: 96, height: "40px" }}>
                <Select
                  sx={{ width: 96, height: "40px" }}
                  value={color}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue={Light}
                >
                  <MenuItem value={"Light"}>Light</MenuItem>
                  <MenuItem value={"Dark"}>Dark</MenuItem>
                  <MenuItem value={"Cosmic"}>Cosmic</MenuItem>
                  <MenuItem value={"Corporate"}>Corporate</MenuItem>
                </Select>
              </FormControl> */}
            </div>
            <div style={{ paddingRight: "1.25rem" }}>
              <a onClick={() => {window.location.replace('/login')}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  class="eva eva-power-outline"
                  fill="#8f9bb3"
                >
                  <g data-name="Layer 2">
                    <g data-name="power">
                      <rect width="24" height="24" opacity="0"></rect>
                      <path d="M12 13a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v10a1 1 0 0 0 1 1z"></path>
                      <path d="M16.59 3.11a1 1 0 0 0-.92 1.78 8 8 0 1 1-7.34 0 1 1 0 1 0-.92-1.78 10 10 0 1 0 9.18 0z"></path>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader></DrawerHeader>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <Link to="/" className="links">
                <ListItemText primary="Dashboard" />
              </Link>
            </ListItemButton>
            <Divider />
            {/* <ListItemButton>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <Link to="/" className="links">
                {" "}
                <ListItemText primary="Users" />
              </Link>
            </ListItemButton> */}
            <Divider />
            {/* //Users */}
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
              {nestedOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/user/add" className="links">
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary="Create User" />
                  </ListItemButton>
                </Link>
                <Link to="/user/viewall" className="links">
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary="View All" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <Divider />
            {/* Categories */}
            <ListItemButton onClick={handleClickCat}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
              {nestedOpenCat ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nestedOpenCat} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/category/add" className="links">
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary="Add new" />
                  </ListItemButton>
                </Link>
                <Link to="/category/viewall" className="links">
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary="View All" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            {/* <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/user/add" className="links">
                  <ListItemButton sx={{ pl: 7 }}>
                    <ListItemText primary="Create User" />
                  </ListItemButton>
                </Link>
                <Link to="/user/viewall" className="links">
                  <ListItemButton sx={{ pl: 7 }}>
                    <ListItemText primary="View All" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse> */}
            {/* <ListItemButton>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
              {nestedOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton> */}
            <Divider />
            <ListItemButton onClick={handleClickBanner}>
              <ListItemIcon>
                <FlagIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {nestedOpenBanner ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nestedOpenBanner} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/banner/add" className="links">
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary="Add new" />
                  </ListItemButton>
                </Link>
                <Link to="/banner/viewall" className="links">
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary="View All" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
       
            <Divider />
           <ListItemButton onClick={handleClickOrders}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
              {nestedOpenOrders ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nestedOpenOrders} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* <Link to="/orders/add" className="links">
                  <ListItemButton sx={{ pl: 7 }}>
                    <ListItemText primary="Add new" />
                  </ListItemButton>
                </Link> */}
                <Link to="/orders/viewall" className="links">
                  <ListItemButton sx={{ pl: 9 }}>
                    <ListItemText primary="View All" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <Divider />
            <ListItemButton onClick={handleClickTransactions}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
              {nestedOpenTransactions ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nestedOpenTransactions} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* <Link to="/transactions/add" className="links">
                  <ListItemButton sx={{ pl: 7 }}>
                    <ListItemText primary="Add new" />
                  </ListItemButton>
                </Link> */}
                <Link to="/transactions/viewall" className="links">
                  <ListItemButton sx={{ pl: 9 }}> 
                    <ListItemText primary="View All" className="list-item-text"/>
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <Divider />
             <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="User Settings" />
              {nestedOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {nestedOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 10 }}>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse> */}
          </List>
          {/* <List>
          {[
            "Dashboard",
            "User",
            "Categories",
            "Banners",
            "Coupons",
            "Delivery Modes",
            "Delivery Profile",
            "Vendors",
            "Orders",
            "Transactions",
            "Payment Methods",
            "Faqs",
            "Support",
            "Setting",
          ].map((text, index) => (
            <ListItem
              button
              onClick={(e) => {
                listClick(index);
              }}
              key={text}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "13px",
                borderBottom: "1px solid #edf1f7",
              }}
            >
              <div style={{ display: "flex" }}>
                <ListItemIcon
                  sx={{
                    minWidth: "20px",
                    paddingRight: ".7rem",
                    alignItems: "center",
                  }}
                >
                  {index === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      class="eva eva-activity-outline"
                      fill="#598bff"
                    >
                      <g data-name="Layer 2">
                        <g data-name="activity">
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(90 12 12)"
                            opacity="0"
                          ></rect>
                          <path d="M14.33 20h-.21a2 2 0 0 1-1.76-1.58L9.68 6l-2.76 6.4A1 1 0 0 1 6 13H3a1 1 0 0 1 0-2h2.34l2.51-5.79a2 2 0 0 1 3.79.38L14.32 18l2.76-6.38A1 1 0 0 1 18 11h3a1 1 0 0 1 0 2h-2.34l-2.51 5.79A2 2 0 0 1 14.33 20z"></path>
                        </g>
                      </g>
                    </svg>
                  ) : (
                    ""
                  )}
                  {index === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      class="eva eva-person-outline"
                      fill="#8f9bb3"
                    >
                      <g data-name="Layer 2">
                        <g data-name="person">
                          <rect width="24" height="24" opacity="0"></rect>
                          <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path>
                          <path d="M12 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z"></path>
                        </g>
                      </g>
                    </svg>
                  ) : (
                    ""
                  )}
                  {index > 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      class="eva eva-list-outline"
                      fill="#8f9bb3"
                    >
                      <g data-name="Layer 2">
                        <g data-name="list">
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(180 12 12)"
                            opacity="0"
                          ></rect>
                          <circle cx="4" cy="7" r="1"></circle>
                          <circle cx="4" cy="12" r="1"></circle>
                          <circle cx="4" cy="17" r="1"></circle>
                          <rect
                            x="7"
                            y="11"
                            width="14"
                            height="2"
                            rx=".94"
                            ry=".94"
                          ></rect>
                          <rect
                            x="7"
                            y="16"
                            width="14"
                            height="2"
                            rx=".94"
                            ry=".94"
                          ></rect>
                          <rect
                            x="7"
                            y="6"
                            width="14"
                            height="2"
                            rx=".94"
                            ry=".94"
                          ></rect>
                        </g>
                      </g>
                    </svg>
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "20px" }}>
                  {index === 0 ? (
                    " "
                  ) : (
                    <ChevronLeftIcon
                      style={{ fontSize: "20px", color: "#8f9bb3" }}
                    />
                  )}
                </ListItemIcon>
              </div>
            </ListItem>
          ))}
        </List> */}
        </Drawer>
        {/* Changes Made here */}
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route path="/user/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: "2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <CreateUser />
            </Box>
          </Route>
          <Route path="/user/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllUsers />
            </Box>
          </Route>
          <Route path="/user/edit/:id">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditUser></EditUser>
            </Box>
          </Route>
          <Route path="/category/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <CategoriesForm />
            </Box>
          </Route>
          <Route path="/category/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllCategories />
            </Box>
          </Route>
          <Route path="/category/edit/:id">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditCat></EditCat>
            </Box>
          </Route>
          <Route path="/login">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <LoginPage />
            </Box>
          </Route>
          <Route path="/banner/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AddBanners />
            </Box>
          </Route>
          <Route path="/banner/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <ViewBanners></ViewBanners>
            </Box>
          </Route>
          <Route path="/coupons/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <CouponsForm></CouponsForm>
            </Box>
          </Route>
          <Route path="/coupons/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllCoupons></AllCoupons>
            </Box>
          </Route>
          <Route path="/coupons/edit/:id">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditCoupons></EditCoupons>
            </Box>
          </Route>

          {/* DeliveryModes Start */}
          <Route path="/deliverymodes/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <DeliveryModes></DeliveryModes>
            </Box>
          </Route>
          <Route path="/deliverymodes/edit">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditDeliveryModes></EditDeliveryModes>
            </Box>
          </Route>
          <Route path="/deliverymodes/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllDeliveryModes></AllDeliveryModes>
            </Box>
          </Route>
          {/* DeliveryModes End */}
          {/* DeliveryProfile */}
          <Route path="/deliveryprofile/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <DeliveryProfile></DeliveryProfile>
            </Box>
          </Route>
          <Route path="/deliveryprofile/edit">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditDeliveryProfile></EditDeliveryProfile>
            </Box>
          </Route>
          <Route path="/deliveryprofile/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllDeliveryProfile></AllDeliveryProfile>
            </Box>
          </Route>
          {/* DeliveryProfileEnds */}
          {/* Vendors */}
          <Route path="/vendors/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllVendors></AllVendors>
            </Box>
          </Route>
          <Route path="/vendors/edit">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditVendors></EditVendors>
            </Box>
          </Route>
          <Route path="/vendors/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <Vendors></Vendors>
            </Box>
          </Route>
          {/* Vendors End */}
          {/* Orders */}
          <Route path="/orders/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllOrders></AllOrders>
            </Box>
          </Route>
          <Route path="/orders/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <Orders></Orders>
            </Box>
          </Route>
          <Route path="/orders/edit">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditOrders></EditOrders>
            </Box>
          </Route>
          {/* Orders End */}
          {/* Transactions */}
          <Route path="/transactions/add">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <Transactions></Transactions>
            </Box>
          </Route>
          <Route path="/transactions/viewall">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <AllTransactions></AllTransactions>
            </Box>
          </Route>
          <Route path="/transactions/edit">
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: " 2.25rem 2.25rem 0.75rem ",
              }}
            >
              <DrawerHeader />
              <EditTransactions></EditTransactions>
            </Box>
          </Route>
          {/* Transactions End */}
        </Switch>
      </Box>
    </Router>
  );
}
