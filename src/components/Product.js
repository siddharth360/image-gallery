import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import StarRateIcon from "@material-ui/icons/StarRate";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "unset",
    position: "relative",
    width: "100%",
    margin: "0 auto",
    height: "184px",
    borderBottom: "solid 1px #f0f0f0",
    [theme.breakpoints.up("md")]: {
      margin: "0px",
      width: "430px",
    },
  },
  imageGrid: {
    display: "flex",
    alignItems: "center",
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  productImage: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  productInfo: {
    maxWidth: "86%",
  },
  productTitle: {
    color: "#000000",
    fontSize: "14px",
    fontWeight: "400",
    letterSpacing: "0.4px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    textAlign: "left",
    lineHeight: "1.3",
  },
  productWeight: {
    color: "#757575",
    fontSize: "10px",
    fontWeight: "400",
    letterSpacing: "0.4px",
    marginTop: "10px",
    lineHeight: "1",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    marginBottom: "10px",
  },
  discountedPrice: {
    margin: "0px",
    color: "#000000",
    fontSize: "16px",
    fontWeight: "550",
    letterSpacing: "0.4px",
    marginRight: "10px",
  },
  actualPrice: {
    margin: "0px",
    color: "#757575",
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.4px",
    webkitTextDecoration: "line-through",
    textDecoration: "line-through",
    backfaceVisibility: "hidden",
  },
  addCartButton: {
    color: "white",
    border: "10px",
    fontFamily: "inherit",
    webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    cursor: "pointer",
    fontSize: "inherit",
    fontWeight: "inherit",
    position: "relative",
    transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    borderRadius: "2px",
    overflow: "hidden",
    backgroundColor: "rgb(79, 207, 100)",
    minWidth: "140px",
    height: "40px",
    lineHeight: "1.3",
    textTransform: "uppercase",
  },
  outStockButton: {
    color: "white",
    border: "10px",
    fontFamily: "inherit",
    webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    cursor: "pointer",
    fontSize: "inherit",
    fontWeight: "inherit",
    position: "relative",
    transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    borderRadius: "2px",
    overflow: "hidden",
    backgroundColor: "#b0b0b0",
    minWidth: "140px",
    height: "40px",
    lineHeight: "1.3",
    textTransform: "uppercase",
  },
  buttonTitle: {
    fontSize: "14px",
    position: "relative",
    verticalAlign: "middle",
    letterSpacing: "0px",
    textTransform: "uppercase",
    fontWeight: "500",
    fontFamily: "'Clear Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  dropdown: {
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    marginBottom: "20px",
    display: "flex",
  },
  dropdownContainer: {
    display: "flex",
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
    border: "none",
    padding: "13px 10px",
    fontSize: "12px",
    textAlign: "center",
    fontWeight: "500",
    color: "#757575",
    outline: "none",
    width: "90px",
    background: "none",
  },
  productRating: {
    position: "absolute",
    top: "-15px",
    right: "-5px",
    zIndex: "5",
    [theme.breakpoints.up("md")]: {
      top: "5px",
    },
  },
  productRatingContainer: {
    border: "10px",
    boxSizing: "borderBox",
    fontFamily: "inherit",
    cursor: "pointer",
    textDecoration: "none",
    margin: "0px",
    padding: "12px",
    outline: "none",
    fontSize: "0px",
    fontWeight: "inherit",
    position: "relative",
    overflow: "visible",
    transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    width: "48px",
    height: "48px",
    background: "none",
    justifyContent: "center",
    color: "#757575",
  },
  ratingValue: {
    display: "flex",
    alignItems: "center",
  },
  ratingValueContainer: {
    color: "#757575",
    fontSize: "13px",
    fontWeight: "500",
    marginRight: "2px",
  },
  starRateIcon: {
    fontSize: "18px",
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <>
      <div>
        <Grid container spacing={2} className={classes.productContainer}>
          <Grid className={classes.imageGrid} item>
            <ButtonBase className={classes.imageContainer}>
              <img
                className={classes.productImage}
                alt="complex"
                src={data?.image_urls_webp?.x120}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs className={classes.productInfo}>
                <Typography
                  className={classes.productTitle}
                  gutterBottom
                  variant="subtitle1"
                >
                  {data?.name}
                </Typography>
                {data?.weight !== 0 && (
                  <Typography
                    className={classes.productWeight}
                    component={"span"}
                  >
                    <p>{`(${data?.weight} ${data?.weight_unit})`}</p>
                  </Typography>
                )}
                <Typography
                  className={classes.priceContainer}
                  component={"span"}
                  variant="body2"
                  color="textSecondary"
                >
                  {data?.final_price === data?.price ? (
                    <p className={classes.discountedPrice}>
                      {`₹ ${data?.final_price}`}
                    </p>
                  ) : (
                    <>
                      <p className={classes.discountedPrice}>
                        {`₹ ${data?.final_price}`}
                      </p>
                      <p className={classes.actualPrice}>
                        {`₹ ${data?.price}`}
                      </p>
                    </>
                  )}
                </Typography>

                {data?.is_in_stock === true && (
                  <button className={classes.addCartButton}>
                    <Typography className={classes.buttonTitle}>
                      Add to cart
                    </Typography>
                  </button>
                )}

                {data?.is_in_stock === false && (
                  <button className={classes.outStockButton}>
                    <Typography className={classes.buttonTitle}>
                      out of stock
                    </Typography>
                  </button>
                )}

                <div className={classes.productRating}>
                  <button className={classes.productRatingContainer}>
                    <div className={classes.ratingValue}>
                      {data?.rating && (
                        <>
                          <span className={classes.ratingValueContainer}>
                            {data?.rating}
                          </span>
                          <StarRateIcon className={classes.starRateIcon} />
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
