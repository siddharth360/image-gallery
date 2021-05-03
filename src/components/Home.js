import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Product from "./Product";
import api, { genericHeaders, productsApi } from "../config";
import ProductAction from "./ProductAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  productsContainer: {
    padding: "15px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "65px",
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "65px",
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "25px",
    },
  },
  productsText: {
    color: "#000000",
    fontSize: "20px",
    fontWeight: 500,
    margin: 0,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
  categories: {
    margin: "0px 6px 0px 6px",
  },
  category: {
    padding: "6px 6px",
  },
  categoryData: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "65px",
    backgroundColor: "rgba(0,0,0,0.22)",
    width: "120px",
    cursor: "pointer",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "4px",
    backfaceVisibility: "hidden",
    fontSize: "13px",
    opacity: "0.8",
  },
  activeCategoryData: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "65px",
    backgroundColor: "rgba(0,0,0,0.22)",
    width: "120px",
    cursor: "pointer",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "4px",
    backfaceVisibility: "hidden",
    fontSize: "14px",
    fontWeight: "600",
    opacity: "1",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Home() {
  const classes = useStyles();
  const divRef = useRef(null);
  const [value, setValue] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [firstThree, setFirstThree] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isViewMore, setIsViewMore] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: `${api}`,
      headers: genericHeaders(),
    };

    axios
      .request(options)
      .then((response) => {
        if (response?.status === 200) {
          const { category_list } = response?.data;
          setCategoryList(category_list);
          setCategoryId(category_list[1].category_id);
          getProducts(category_list[1].category_id);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (divRef && divRef.current) {
      divRef.current.focus();
      window.scrollTo({
        top: divRef.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef.current]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProducts = (id) => {
    const options = {
      method: "GET",
      url: `${productsApi}?category_id=${id}`,
    };

    axios
      .request(options)
      .then((response) => {
        if (response?.status === 200) {
          const firstThree = response?.data?.products.filter(
            (product, index) => {
              if (index <= 2) {
                return product;
              } else {
                return null;
              }
            }
          );
          setProductsList(firstThree);
          setFirstThree(firstThree);
          setAllProducts(response?.data?.products);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const viewMore = () => {
    setIsViewMore(true);
    setProductsList(allProducts);
  };

  const viewLess = () => {
    setIsViewMore(false);
    setProductsList(firstThree);
  };

  return (
    <div className={classes.root} id="section2">
      <div className={classes.productsContainer}>
        <Typography className={classes.productsText}>Our Products</Typography>
      </div>
      <Tabs
        selectionFollowsFocus={categoryId ? true : false}
        className={classes.categories}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ style: { backgroundColor: "white" } }}
      >
        {categoryList?.map((category, index) => {
          if (category.category_id !== "185") {
            return (
              <Tab
                ref={category?.category_id === categoryId ? divRef : null}
                key={category?.category_id}
                className={classes.category}
                label={
                  <>
                    <div
                      className={
                        category?.category_id === categoryId
                          ? classes.activeCategoryData
                          : classes.categoryData
                      }
                      style={{
                        backgroundImage: `url(${category.category_image})`,
                      }}
                      onClick={() => {
                        setCategoryId(category?.category_id);
                        getProducts(category?.category_id);
                        if (isViewMore && allProducts.length > 3) {
                          viewLess();
                        }
                      }}
                    >
                      {category.category_name}
                    </div>
                  </>
                }
              />
            );
          } else {
            return null;
          }
        })}
      </Tabs>

      {categoryList?.map((_, index) => (
        <TabPanel value={value} index={index} key={index} component={"span"}>
          {productsList.map((product, index) => (
            <Product key={index} data={product} />
          ))}
        </TabPanel>
      ))}

      {value !== "" && (
        <ProductAction
          isViewMore={isViewMore}
          categoryId={categoryId}
          setCategoryId={(id) => setCategoryId(id)}
          viewMore={viewMore}
          viewLess={viewLess}
          categoryList={categoryList}
          allProducts={allProducts}
          getProducts={(id) => getProducts(id)}
        />
      )}
    </div>
  );
}
