import { Box, Container, Flex, Input, Select } from "@chakra-ui/react";
import React, { lazy, useEffect, useState, Suspense } from "react";
// import RestaurantListCustomer from "./RestaurantListCustomer";
import { useNavigate } from "react-router-dom";
import { State } from "../../Context/Provider";
import Loader from "../Loader";

const PropertyList = lazy(() => import("./PropertyList"));

const BuyerMain = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "all");
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || "asc"
  );
  const { isInRestaurantMain, setIsInRestaurantMain } = State();

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    localStorage.setItem("searchTerm", value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    localStorage.setItem("filter", value);
  };

  const handleSortOrderChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
    localStorage.setItem("sortOrder", value);
  };

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("filter", filter);
    localStorage.setItem("sortOrder", sortOrder);
    setIsInRestaurantMain(true);
  }, [searchTerm, filter, sortOrder]);

  return (
    <>
      <Container maxW="container.lg" mt={10}>
        <Box textAlign="center" mb={6}>
          <Input
            type="text"
            placeholder="Search location..."
            value={searchTerm}
            onChange={handleSearch}
            size="lg"
            maxW="400px"
          />
        </Box>
        <Flex justify="space-between" align="center" mb={6}>
          <Select
            placeholder="Sort by..."
            value={sortOrder}
            onChange={handleSortOrderChange}
            width="150px"
          >
            {/* Add your sort options */}
            <option value="asc">Lowest </option>
            <option value="desc">Highest </option>
          </Select>
        </Flex>
      </Container>
      <Suspense fallback={<Loader />}>
        <PropertyList searchTerm={searchTerm} sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default BuyerMain;
