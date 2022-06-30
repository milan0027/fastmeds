import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {  useState } from "react";
import { ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaBars } from "react-icons/fa";
import { Button } from "@mui/material";

function AppBar(props) {
  return (
    <MuiAppBar
      elevation={0}
      position='fixed'
      {...props}
      style={{ background: "linear-gradient(150deg, #4341be, #23d1a8)" }}
    />
  );
}

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 70,
  },
}));

function Navbar({ auth: { isAuthenticated }, logout }) {
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isAuthenticated && (
            <div
              onClick={() => handleToggleSidebar(!toggled)}
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                background: "#353535",
                color: "#fff",
                textAlign: "center",
                borderRadius: " 50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
              }}
            >
              <FaBars />
            </div>
          )}
          <Box sx={{ flex: 1 }} />

          <Link
            
            to='/'
           
          >
            {"FastMeds"}
          </Link>
          {isAuthenticated === false ? (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                style={{marginRight:"10px"}}
                to='/auth/login'
                
              >
                {"Sign In"}
              </Link>
              <Link
               
                to='/auth/register'
             
              >
                {"Sign Up"}
              </Link>
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Button
               
                onClick={logout}
                
              >
                {"logout"}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isAuthenticated && (
        <ProSidebar
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint='xxl'
        >
          <Menu iconShape='square'>
            {/* <Link to="/dashboard/additem"></Link>
            <Link to="/dashboard/removeitem"></Link>
            <Link to="/dashboard/showinventory"></Link> */}
            <MenuItem icon={<FaGem />}>
              <Link to='/dashboard' >Dashboard</Link>
            </MenuItem>
            <MenuItem icon={<FaGem />}><Link to='/dashboard/additem' >Add Items</Link></MenuItem>
            <MenuItem icon={<FaGem />}><Link to='/dashboard/addbed' >Add Beds</Link></MenuItem>
            <MenuItem icon={<FaGem />}><Link to='/dashboard/allocatedbeds' >Allocated Beds</Link></MenuItem>
            <MenuItem icon={<FaGem />}><Link to='/dashboard/removeitem' >Bill/Remove Items</Link></MenuItem>
            <MenuItem icon={<FaGem />}><Link to='/dashboard/removebed' >Bill/Remove Beds</Link></MenuItem>
            <MenuItem icon={<FaGem />}><Link to='/dashboard/viewinventory' >View Inventory</Link></MenuItem>
            {/* <SubMenu title="Components" icon={<FaHeart />}>
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu> */}
          </Menu>
        </ProSidebar>
      )}
    </div>
  );
}

Navbar.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);