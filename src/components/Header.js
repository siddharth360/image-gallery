import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autosuggest from "react-autosuggest";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "white",
    position: "sticky",
    top: "0",
    zIndex: 100,
    height: 100,
    boxShadow: "#00000029 0px 1px 12px 0px",
    height: "130px",
    display: "flex",
    width: "100%",
  },
  headerContainer: {
    width: "100%",
  },
  dismissAutoSuggest: {
    backgroundColor: "#E57373",
    cursor: "pointer",
    padding: "10px 20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    borderRightColor: "rgba(255, 255, 255, 0.1)",
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    borderLeftColor: "rgba(255, 255, 255, 0.1)",
  },
  searchPhotos: {
    textAlign: "center",
  },
  autoSuggestContainer: {
    display: "flex",
    justifyContent: "center",
  },
  autoSuggest: {
    textAlign: "center",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { savedQueries } = props;
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    props.getValues(value);
  }, [value]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Enter a photo name",
    value: value,
    // type: "search",
    onChange: onChange,
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : savedQueries.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div {...containerProps}>
        {children}
        <div
          className={classes.dismissAutoSuggest}
          onClick={() => {
            localStorage.setItem("savedQueries", JSON.stringify([]));
            const value = document
              .querySelector(".react-autosuggest__input")
              .blur();
          }}
        >
          Dismiss auto suggest
        </div>
      </div>
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          <h3 className={classes.searchPhotos}>Search Photos</h3>

          <div className={classes.autoSuggestContainer}>
            <Autosuggest
              className={classes.autoSuggest}
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              renderSuggestionsContainer={renderSuggestionsContainer}
              inputProps={inputProps}
            />
          </div>
        </div>
      </div>
    </>
  );
}
