import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { lazy, useEffect, useState, Suspense } from "react";
// import ItemsDisplayRestaurant from "./ItemsDisplayRestaurant";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import Loader from "../Loader";

const ItemsDisplaySeller = lazy(() => import("./ItemsDisplaySeller"));

const SellerMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("restaurantId")) {
      navigate("/");
    }
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleCreate = () => {
    navigate("/create");
  };

  const handleInterestedBuyers = () => {
    navigate("/interestedBuyersList");
  };

  const handleSortOrderChange = (event) => {
    const value = event.target.value;
    setSortOrder(value);
  };

  return (
    <>
      <Container maxW="container.lg" mt={10}>
        <Box textAlign="center">
          <Input
            type="text"
            placeholder="Search based on Location..."
            value={searchTerm}
            onChange={handleSearch}
            size="lg"
            maxW="400px"
          />
        </Box>

        <Flex justify="flex-end" mb={6}>
          <Button colorScheme="purple" onClick={handleInterestedBuyers}>
            <Icon as={InfoOutlineIcon} /> &nbsp; View Interested Buyers
          </Button>
        </Flex>

        <Flex justify="space-between" align="center" mb={6}>
          <Select
            placeholder="Sort by..."
            value={sortOrder}
            onChange={handleSortOrderChange}
            width="150px"
          >
            {/* Add your sort options */}
            <option value="asc">Lowest</option>
            <option value="desc">Highest</option>
          </Select>

          <Button colorScheme="green" onClick={handleCreate}>
            <Icon as={AddIcon} /> &nbsp; Create New Property
          </Button>
        </Flex>
      </Container>
      <Suspense fallback={<Loader />}>
        <ItemsDisplaySeller searchTerm={searchTerm} sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default SellerMain;
