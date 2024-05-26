import "./App.css";
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./components/Home"));
// import Home from "./components/Home";

// import RestaurantHome from "./components/RestaurantHome";
const SellersHome = lazy(() => import("./components/SellersHome"));

// import CustomerHome from "./components/CustomerHome";
const BuyersHome = lazy(() => import("./components/BuyersHome"));

// import RestaurantMain from "./components/Restaurant Interface/RestaurantMain";
const SellerMain = lazy(() =>
  import("./components/Seller Interface/SellerMain")
);

// import CustomerMain from "./components/Customer Interface/CustomerMain";
const BuyerMain = lazy(() => import("./components/buyer Interface/BuyerMain"));

// import CreateNewItem from "./components/Restaurant Interface/CreateNewItem";
const CreateNewItem = lazy(() =>
  import("./components/Seller Interface/CreateNewItem")
);

// import NotFound from "./NotFound";
const NotFound = lazy(() => import("./NotFound"));

// import OrderCustomer from "./components/Orders/OrderCustomer";

// import OrderRestaurant from "./components/Orders/OrderRestaurant";
const ListOfInterestedBuyers = lazy(() =>
  import("./components/InterestedBuyers/ListOfInterestedBuyers")
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
          exact
        />
        <Route
          path="/sellers"
          element={
            <Suspense fallback={<Loader />}>
              <SellersHome />
            </Suspense>
          }
          exact
        />
        <Route
          path="/buyers"
          element={
            <Suspense fallback={<Loader />}>
              <BuyersHome />
            </Suspense>
          }
          exact
        />
        <Route
          path="/sellerMain"
          element={
            <Suspense fallback={<Loader />}>
              <SellerMain />
            </Suspense>
          }
          exact
        />
        <Route
          path="/buyerMain"
          element={
            <Suspense fallback={<Loader />}>
              <BuyerMain />
            </Suspense>
          }
          exact
        />

        <Route
          path="/create"
          element={
            <Suspense fallback={<Loader />}>
              <CreateNewItem />
            </Suspense>
          }
          exact
        />
        <Route
          path="/notFound"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
          exact
        />

        <Route
          path="/interestedBuyersList"
          element={
            <Suspense fallback={<Loader />}>
              <ListOfInterestedBuyers />
            </Suspense>
          }
          exact
        />
      </Routes>
    </div>
  );
}

export default App;
