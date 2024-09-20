import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setProducts, setRestaurant } from "./slice";
import { Product, ProductInquiry } from "../../lib/types/product";
import { retrieveProducts } from "./selector";
import { createSelector } from "reselect"
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../lib/config";
import ProductService from "../../services/ProductService";
import { ProductCategory } from "../../lib/enums/product.enum";
import { error, log } from "console";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../lib/types/search";


interface ProductsProps {
  onAdd: (item: CartItem) => void
}

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({products})
  )
  
export default function Products(props: ProductsProps) {
  const  {onAdd} = props
  const { setProducts } = actionDispatch(useDispatch())
  const {products} = useSelector(productsRetriever)
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCategory: ProductCategory.BODYCARE,
    search: "",
  })
  const [ searchText, setSearchText] = useState<string>("")
  const history = useHistory()
  useEffect(() => {
    const product = new ProductService()
    product
    .getProducts(productSearch)
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));
    
  },[productSearch])

  useEffect(() => {
    if(searchText === "") {
      productSearch.search = ""
      setProductSearch({...productSearch})
    }
  },[searchText])

/* HANDLER SECTION */

const searchCollectionHandler = (collection: ProductCategory) => {
  productSearch.page = 1
  productSearch.productCategory = collection
  setProductSearch({ ...productSearch })
};

const searchOrderHandler = (order: string) => {
  productSearch.page = 1
  productSearch.order = order
  setProductSearch({...productSearch})
};

const searchProductHandler = () => {
  productSearch.search = searchText
  setProductSearch({...productSearch})
};

const paginationHandler = (e: ChangeEvent<any>, value: number) => {
  productSearch.page = value
  setProductSearch({...productSearch})
};

const chooseDishHandler = (id: string) => {
  history.push(`/products/${id}`)
}


  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>Beauty Shop</p>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {if (e.key === "Enter") searchProductHandler()}}
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={ productSearch.order === "createdAt" ? "primary" : "secondary"}
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={ productSearch.order === "productPrice" ? "primary" : "secondary"}
                className={"order"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={ productSearch.order === "productViews" ? "primary" : "secondary"}
                className={"order"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button variant={"contained"} 
                  color={ productSearch.productCategory === ProductCategory.OTHER ? "primary" : "secondary"} 
                  onClick={() => searchCollectionHandler(ProductCategory.OTHER)}>
                  Other
                </Button>
                <Button variant={"contained"} 
                  color={ productSearch.productCategory === ProductCategory.GROOMING ? "primary" : "secondary"} 
                  onClick={() => searchCollectionHandler(ProductCategory.GROOMING)}>
                  Grooming
                </Button>
                <Button variant={"contained"} 
                  color={ productSearch.productCategory === ProductCategory.HAIRCARE ? "primary" : "secondary"} 
                  onClick={() => searchCollectionHandler(ProductCategory.HAIRCARE)}>
                  Haircare
                </Button>
                <Button variant={"contained"} 
                  color={ productSearch.productCategory === ProductCategory.LIQUID ? "primary" : "secondary"} 
                  onClick={() => searchCollectionHandler(ProductCategory.LIQUID)}>
                  Liquid
                </Button>
                <Button variant={"contained"} 
                  color={ productSearch.productCategory === ProductCategory.NAILCARE ? "primary" : "secondary"} 
                  onClick={() => searchCollectionHandler(ProductCategory.NAILCARE)}>
                  Nailcare
                </Button>
                <Button variant={"contained"} 
                  color={ productSearch.productCategory === ProductCategory.SKINCARE ? "primary" : "secondary"} 
                  onClick={() => searchCollectionHandler(ProductCategory.SKINCARE)}>
                  Skincare
                </Button>
                <Button variant={"contained"} 
                  color={ productSearch.productCategory === ProductCategory.BODYCARE ? "primary" : "secondary"} 
                  onClick={() => searchCollectionHandler(ProductCategory.BODYCARE)}>
                  Bodycare
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = product.productCategory === ProductCategory.LIQUID 
                  ? product.productVolume + "ml"
                  : product.productSize + "SIZE"
                  return (
                    <Stack 
                      key={ product._id} 
                      className={"product-card"}
                      onClick = {()=>chooseDishHandler(product._id)}
                      >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button className={"shop-btn"}
                          onClick={(e) => {
                            console.log("Add to cart button pressed");
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            })
                            e.stopPropagation()
                          }}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge badgeContent={product.productViews} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color: product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count = { 
                products.length !== 0 
                ? productSearch.page +1 
                : productSearch.page}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}>Top Model</Box>
          <Stack className={"brand-list"}>
            <Box className={"review-box"}>
              <img src={"/img/gurme.webp"} />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/sweets.webp"} />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/seafood.webp"} />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/doner.webp"} />
            </Box>
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}

