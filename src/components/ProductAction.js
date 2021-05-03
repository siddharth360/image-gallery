import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  categoriesContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
      paddingLeft: "50px",
      width: "430px",
    },
  },
  dropdownContainer: {
    display: "flex",
    cursor: "pointer",
  },
  formControl: {
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "10px",
  },
  dropdown: {
    fontWeight: "550",
  },
  showingForText: {
    fontSize: "10px",
    margin: "0",
    alignItems: "center",
    display: "flex",
  },
  changeText: {
    color: "#757575",
    fontSize: "10px",
    margin: "0",
    alignItems: "center",
    display: "flex",
  },
  viewMoreButton: {
    textAlign: "right",
    border: "none",
    padding: "13px 10px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#757575",
    outline: "none",
    width: "90px",
    background: "none",
    cursor: "pointer",
  },
}));

export default function ProductAction(props) {
  const { categoryList, isViewMore, categoryId, allProducts } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(categoryId);
  }, [categoryId]);

  const handleChange = (value) => {
    setValue(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.categoriesContainer}>
          <div className={classes.dropdownContainer}>
            <p className={classes.showingForText} onClick={handleOpen}>
              Showing for
            </p>
            <FormControl className={classes.formControl}>
              <Select
                className={classes.dropdown}
                disableUnderline={true}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={value}
              >
                {categoryList?.map((category) => {
                  if (category.category_id !== "185") {
                    return (
                      <MenuItem
                        key={category?.category_id}
                        value={category?.category_id}
                        onClick={() => {
                          props.setCategoryId(category?.category_id);
                          handleChange(category?.category_id);
                          props.getProducts(category?.category_id);
                          if (isViewMore && allProducts.length > 3) {
                            props.viewLess();
                          }
                        }}
                      >
                        {category.category_name}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
            <p className={classes.changeText} onClick={handleOpen}>
              change
            </p>
          </div>

          {!isViewMore && allProducts.length > 3 && (
            <button
              className={classes.viewMoreButton}
              onClick={() => props.viewMore()}
            >
              [+] View more
            </button>
          )}

          {isViewMore && allProducts.length > 3 && (
            <button
              className={classes.viewMoreButton}
              onClick={() => props.viewLess()}
            >
              [-] View less
            </button>
          )}
        </div>
      </div>
    </>
  );
}
