import React, { useEffect, useState } from "react";
// import ustraaLogo from "../assets/ustralogo.png";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import MenuIcon from "@material-ui/icons/Menu";
import { SettingsOverscanOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    position: "sticky",
    top: "0",
    zIndex: 100,
    height: 100,
    boxShadow: "#00000029 0px 1px 12px 0px",
    height: "120px",
    // [theme.breakpoints.up("md")]: {
    //   height: 65,
    // },
  },
  headerFirst: {
    display: "flex",
    // alignItems: "center",
    // height: "52px",
    // [theme.breakpoints.up("md")]: {
    //   height: 70,
    // },
  },
  menuIcon: {
    padding: "12px",
  },
  logoLink: {
    display: "flex",
    flex: "1",
  },
  logo: {
    width: "100px",
    objectFit: "contain",
  },
  headerFirstNav: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
  accountIconContainer: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px 10px 10px",
  },
  icon: {
    fontSize: "20px",
  },
  headerSecond: {
    display: "flex",
    alignItems: "center",
    height: "40px",
    // [theme.breakpoints.up("md")]: {
    //   display: "none",
    // },
  },
  headerSearchSecond: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    height: "40px",
    padding: "12px",
  },
  headerSearchFirst: {
    height: "40px",
    padding: "12px",
    width: "100%",
    textAlign: "center",
    margin: "0 auto",
    // [theme.breakpoints.up("md")]: {
    //   display: "flex",
    //   alignItems: "center",
    // },
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  },
  headerSearchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#efefef",
    paddingLeft: "10px",
    width: "100%",
    height: "35px",
    borderRadius: "4px",
  },
  searchInput: {
    display: "flex",
    position: "relative",
    width: "95%",
    height: "36px",
    padding: "0 8px",
    border: "none",
    outline: "none",
    backgroundColor: "#efefef",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "14px",
    opacity: "1",
    zIndex: "1300",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    borderRadius: "4px",
    // [theme.breakpoints.up("md")]: {
    //   width: 600,
    // },
  },
  chatIconContainer: {
    display: "flex",
    alignItems: "center",
    padding: "12px 12px 12px 0px",
  },
  chatIcon: {
    fill: "rgb(21, 126, 188)",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  useEffect(() => {
    props.getValues(value);
  }, [value]);

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerFirst}>
          {/* <MenuIcon className={classes.menuIcon} />
          <a href="/" className={classes.logoLink}>
            <img className={classes.logo} src={ustraaLogo} alt="ustraa-logo" />
          </a> */}
          <div style={{ width: "100%" }}>
            <h3 style={{ textAlign: "center" }}>Search Photos</h3>
            <div className={classes.headerSearchFirst}>
              <div className={classes.headerSearchContainer}>
                <SearchIcon />
                <input
                  className={classes.searchInput}
                  placeholder="Search for a product"
                  type="search"
                  id="searchBar"
                  name="searchBar"
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <div className={classes.headerFirstNav}>
            <div className={classes.iconContainer}>
              <NotificationsIcon className={classes.icon} />
            </div>
            <div className={classes.iconContainer}>
              <ShoppingCartIcon className={classes.icon} />
            </div>
            <div className={classes.accountIconContainer}>
              <AccountCircleIcon className={classes.icon} />
            </div>
          </div> */}
        </div>

        {/* <div className={classes.headerSecond}>
          <div className={classes.headerSearchSecond}>
            <div className={classes.headerSearchContainer}>
              <SearchIcon />
              <input
                className={classes.searchInput}
                placeholder="Search for a product"
                type="search"
                id="searchBar"
                name="searchBar"
              />
            </div>
          </div>
          <div className={classes.chatIconContainer}>
            <ChatIcon className={classes.chatIcon} />
          </div>
        </div> */}
      </div>
    </>
  );
}
