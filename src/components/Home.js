import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, Grid, DialogContent } from "@material-ui/core";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";
import { recentUrl, searchUrl } from "../config";
import "../App.css";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    margin: "30px",
  },
  infiniteScroll: {
    overflow: "hidden !important",
  },
  scrollImage: {
    "&:hover": {
      cursor: "pointer",
    },
    height: "300px",
    width: "300px",
    objectFit: "cover",
  },
  dialogContent: {
    height: "600px",
    width: "600px",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      height: "auto",
    },
  },
  dialogImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const override = css`
  display: block;
  margin: 50px auto 0px auto;
  border-color: black;
`;

function Home(props) {
  const { classes, value, getSavedQueries } = props;
  const [prevKeyword, setPrevKeyword] = useState("");
  const [currSearchPage, setCurrSearchPage] = useState(1);
  const [currRecentPage, setCurrRecentPage] = useState(1);
  const [searchImages, setSearchImages] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const [savedQueries, setSavedQueries] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState("");
  const [color] = useState("#000");

  useEffect(() => {
    getRecent("default");
    let savedQueries = JSON.parse(localStorage.getItem("savedQueries"));
    if (savedQueries !== null) {
      setSavedQueries(savedQueries);
    } else {
      localStorage.setItem("savedQueries", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const getUniqueBy = (prop, list) => {
      const objUniq = list.reduce(
        (res, item) => ({ ...res, [item[prop]]: item }),
        {}
      );
      return Object.keys(objUniq).map((item) => objUniq[item]);
    };
    const uniq = getUniqueBy("name", savedQueries);
    localStorage.setItem("savedQueries", JSON.stringify(uniq));
    getSavedQueries(uniq);
  }, [savedQueries]);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      if (value !== "") {
        searchKeyword("search");
        setRecentImages([]);
        let savedQueries = JSON.parse(localStorage.getItem("savedQueries"));

        let obj = { name: value };
        if (savedQueries !== null) {
          setSavedQueries([...savedQueries, obj]);
        }
      } else if (value === "") {
        getRecent("default");
        setSearchImages([]);
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [value]);

  const handleClickOpen = (val) => {
    setOpen(true);
    setDialogImage(val);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function getRecent(val) {
    const params = `api_key=${process.env.REACT_APP_FLICKR_API_KEY}&format=json&nojsoncallback=1&per_page=12&page=${currRecentPage}`;

    axios.get(recentUrl + params).then((res) => {
      const urlArr = [];
      res?.data?.photos?.photo.forEach((ph) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_m.jpg`,
          title: ph.title,
        };
        urlArr.push(photoObj);
      });
      if (val === "default") {
        setRecentImages(urlArr);
      } else {
        setRecentImages([...recentImages, ...urlArr]);
        setCurrRecentPage(currRecentPage + 1);
      }
    });
  }

  function searchKeyword(val) {
    const keyword = value.toLowerCase();
    if (prevKeyword === keyword) {
      setCurrSearchPage(currSearchPage + 1);
    } else {
      setCurrSearchPage(1);
      setSearchImages([]);
    }
    setPrevKeyword(keyword);

    const params = `api_key=${process.env.REACT_APP_FLICKR_API_KEY}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${currSearchPage}`;

    axios.get(searchUrl + params).then((res) => {
      const urlArr = [];
      res?.data?.photos?.photo.forEach((ph) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_m.jpg`,
          title: ph.title,
        };
        urlArr.push(photoObj);
      });
      if (val === "search") {
        setSearchImages(urlArr);
      } else {
        setSearchImages([...searchImages, ...urlArr]);
      }
    });
  }

  return (
    <div className={classes.root}>
      {value !== "" ? (
        <InfiniteScroll
          className={classes.infiniteScroll}
          next={() => searchKeyword("scroll")}
          dataLength={searchImages.length}
          hasMore={true}
          loader={<BeatLoader color={color} css={override} size={20} />}
        >
          <Grid className={classes.container} container spacing={3}>
            {searchImages.map((image, index) => (
              <Grid item sm={4} lg={3} xl={3} xs={12} key={index}>
                <img
                  className={classes.scrollImage}
                  src={image.url}
                  alt={image.title}
                  onClick={() => handleClickOpen(image)}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <InfiniteScroll
          className={classes.infiniteScroll}
          next={() => getRecent("scroll")}
          dataLength={recentImages.length}
          hasMore={true}
          loader={<BeatLoader color={color} css={override} size={20} />}
        >
          <Grid className={classes.container} container spacing={3}>
            {recentImages.map((image, index) => (
              <Grid item sm={4} lg={3} xl={3} xs={12} key={index}>
                <img
                  className={classes.scrollImage}
                  src={image.url}
                  alt={image.title}
                  onClick={() => handleClickOpen(image)}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}

      <Dialog
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent className={classes.dialogContent}>
          <img
            className={classes.dialogImage}
            src={dialogImage.url}
            alt={dialogImage.title}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
