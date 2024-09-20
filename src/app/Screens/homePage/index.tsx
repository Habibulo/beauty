import React, { useEffect } from "react";
import Statistics from "./Statistics";
import NewDishes from "./NewDishes";
import Events from "./Events";
import PopularDishes from "./PopularDishes";
import ActiveUsers from "./ActiveUsers";
import "../../css/home.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCategory } from "../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../lib/types/member";


const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCategory: ProductCategory.BODYCARE,
      })
      .then((data) => {
        console.log("data:", data);
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCategory: ProductCategory.BODYCARE,
      })
      .then((data) => {
        console.log("data:", data);
        setNewDishes(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage" style={{background: "rgb(191,97,89)"}}>
      {/* <Statistics /> */}
      <PopularDishes />
      <NewDishes />
      {/* <Advertisement /> */}
      <ActiveUsers />
      <Events />
    </div>
  );
}
