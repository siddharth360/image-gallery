import React, { Component, Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import tileData from "./tileData";
import { Grid } from "@material-ui/core";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Autosuggest from "react-autosuggest";
import "../App.css";
import Header from "./Header";

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
  gridList: {
    //width: 900,
    height: "auto",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    // "&:hover": {
    //   opacity: 0.25,
    // },
    height: "300px",
    width: "300px",
    objectFit: "cover",
  },
});

function TitlebarGridList(props) {
  const { classes, value } = props;
  const [prevKeyword, setPrevKeyword] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [currRecentPage, setCurrRecentPage] = useState(1);
  //   const [value, setValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photos1, setPhotos1] = useState([]);
  const [top100Films, setTop100Films] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const options = ["Option 1", "Option 2"];

  const languages = [
    {
      name: "C",
      year: 1972,
    },
    {
      name: "cat",
      year: 1972,
    },
    {
      name: "dog",
      year: 1972,
    },
    {
      name: "Elm",
      year: 2012,
    },
  ];

  useEffect(() => {
    getRecent("default");
    // console.log("stringify", JSON.parse(localStorage.getItem("items")));
    let array = JSON.parse(localStorage.getItem("items"));
    console.log("array---", array);
    if (array && array.length > 0) {
      setTop100Films(array);
    }
  }, []);

  useEffect(() => {
    console.log("value", value);
    const timeoutHandler = setTimeout(() => {
      if (value !== "") {
        console.log("sea---");
        searchKeyword("search");
        setPhotos1([]);
        let array = JSON.parse(localStorage.getItem("items"));
        let obj = { title: value };
        // if (array && array.length > 0) {
        setTop100Films([...array, obj]);
        localStorage.setItem("items", JSON.stringify(top100Films));
        // }
      } else if (value === "") {
        getRecent("default");
        setPhotos([]);
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [value]);

  function getRecent(val) {
    // if (prevKeyword === keyword) {
    //   setCurrPage(currPage + 1);
    // } else {
    //   setCurrPage(1);
    // }
    // setPrevKeyword(keyword);
    const url =
      "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&";
    const params = `api_key=${process.env.REACT_APP_FLICKR_API_KEY}&format=json&nojsoncallback=1&per_page=12&page=${currRecentPage}`;

    axios.get(url + params).then((res) => {
      const urlArr = [];
      console.log("res-----", res);
      res?.data?.photos?.photo.forEach((ph) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_m.jpg`,
          title: ph.title,
        };
        urlArr.push(photoObj);
      });
      //   console.log("urlArr", urlArr);
      console.log("getRecent");
      if (val === "default") {
        setPhotos1(urlArr);
      } else {
        setPhotos1([...photos1, ...urlArr]);
        setCurrRecentPage(currRecentPage + 1);
      }
    });
  }

  function searchKeyword(val) {
    const keyword = value.toLowerCase();
    if (prevKeyword === keyword) {
      setCurrPage(currPage + 1);
    } else {
      setCurrPage(1);
      setPhotos([]);
    }
    setPrevKeyword(keyword);

    const url =
      "https://www.flickr.com/services/rest/?method=flickr.photos.search&";
    const params = `api_key=${process.env.REACT_APP_FLICKR_API_KEY}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${currPage}`;

    axios.get(url + params).then((res) => {
      const urlArr = [];
      console.log("res-----", res);
      res?.data?.photos?.photo.forEach((ph) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_m.jpg`,
          title: ph.title,
        };
        urlArr.push(photoObj);
      });
      console.log("urlArr", urlArr);
      if (val === "search") {
        console.log("search===");
        setPhotos(urlArr);
      } else {
        console.log("scroll===");
        setPhotos([...photos, ...urlArr]);
      }
    });
  }

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : languages.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const onChange = (event, { newValue }) => {
    //   setValue(newValue);
  };

  const inputProps = {
    placeholder: "Type a programming language",
    value: value,
    // type: "search",
    onChange: onChange,
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getValues = (value) => {
    console.log("value", value);
  };

  return (
    <div className={classes.root}>
      {/* <Header getValues={getValues} /> */}

      {/* <input
        style={{ margin: "20px" }}
        type="search"
        class="form-control"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search images"
      /> */}

      {/* <Autocomplete
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              label="Search input"
              margin="normal"
              variant="outlined"
              type="search"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        )}
      /> */}

      {/* <Autocomplete
        id="free-solo-demo"
        options={top100Films?.map((option) => option?.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="freeSolo"
            margin="normal"
            variant="outlined"
            type="search"
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={() => searchKeyword("search")}
            style={{ width: "500px" }}
          />
        )}
      /> */}

      {/* <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      /> */}

      {value !== "" ? (
        <InfiniteScroll
          dataLength={photos.length}
          next={() => searchKeyword("scroll")}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          style={{ overflow: "hidden" }}
        >
          {/* <p>search</p> */}
          <Grid className={classes.container} container spacing={3}>
            {photos.map((tile) => (
              <Grid item sm={4} lg={3} xl={3} xs={12} key={tile.url}>
                <img
                  className={classes.image}
                  src={tile.url}
                  alt={tile.title}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <InfiniteScroll
          dataLength={photos1.length}
          next={() => getRecent("scroll")}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          style={{ overflow: "hidden" }}
        >
          {/* <p>default</p> */}
          <Grid className={classes.container} container spacing={3}>
            {photos1.map((tile) => (
              <Grid item sm={4} lg={3} xl={3} xs={12} key={tile.url}>
                <img
                  className={classes.image}
                  src={tile.url}
                  alt={tile.title}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}

      {/* {photos && photos.length > 0 ? (
        <Grid className={classes.container} container spacing={3}>
          {photos.map((tile) => (
            <Grid item lg={3} xl={3} xs={12} key={tile.url}>
              <img className={classes.image} src={tile.url} alt={tile.title} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid className={classes.container} container spacing={3}>
          {tileData.map((tile) => (
            <Grid item lg={3} xl={3} xs={12} key={tile.img}>
              <img className={classes.image} src={tile.img} alt={tile.title} />
            </Grid>
          ))}
        </Grid>
      )} */}
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
