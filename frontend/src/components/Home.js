import { Box, Button, ButtonGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../image/wow.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const rentalQuotesData = [
  {
    quote: "Find your perfect home away from home.",
    author: "Emily Davis",
  },
  {
    quote: "Discover your dream rental today!",
    author: "Michael Thompson",
  },
  {
    quote: "Experience comfort and convenience with our rentals.",
    author: "Sarah Johnson",
  },
  {
    quote: "Your ideal rental is just a click away.",
    author: "Daniel Martinez",
  },
  {
    quote: "Step into your next adventure with our top rentals.",
    author: "Jessica Lee",
  },
  {
    quote: "Turn your property into profit.",
    author: "Robert Brown",
  },
  {
    quote: "List with us and reach thousands of renters.",
    author: "Linda Wilson",
  },
  {
    quote: "Maximize your property's potential with ease.",
    author: "Christopher Anderson",
  },
  {
    quote: "Effortless renting for your property.",
    author: "Patricia Garcia",
  },
  {
    quote: "Your property, their next home.",
    author: "Matthew Rodriguez",
  },
  {
    quote: "Connecting renters and owners with ease.",
    author: "Jennifer Harris",
  },
  {
    quote: "Where great stays and great places meet.",
    author: "James Clark",
  },
  {
    quote: "Rent smarter. Live better.",
    author: "Barbara Lewis",
  },
  {
    quote: "Find it. Rent it. Love it.",
    author: "Anthony Walker",
  },
  {
    quote: "Your next rental experience starts here.",
    author: "Karen Hall",
  },
  {
    quote: "Bringing buyers and sellers together under one roof.",
    author: "Richard Young",
  },
  {
    quote: "Whether renting or listing, we’ve got you covered.",
    author: "Donna King",
  },
  {
    quote: "From your first click to your next move, we’re here for you.",
    author: "Steven Wright",
  },
  {
    quote: "Simplifying the rental journey for everyone.",
    author: "Elizabeth Scott",
  },
  {
    quote: "Unlock endless rental opportunities.",
    author: "Joseph Green",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const navigateToRestaurant = () => {
    navigate("/sellers");
  };
  const navigateToCustomer = () => {
    navigate("/buyers");
  };
  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // height: "50vh", // Adjust the height as needed
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Adjust the duration for each quote
  };

  return (
    <div style={backgroundImageStyle}>
      <Text
        bg={"white"}
        bgClip="text"
        fontSize={{ base: "7xl", sm: "7xl", md: "8xl", lg: "9xl" }}
        fontWeight="extrabold"
      >
        Rentify
      </Text>
      <Stack
        spacing={4}
        direction="row"
        align="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding={{ base: 4, sm: 6, md: 8, lg: 10 }} // Adjust padding based on screen size
      >
        <ButtonGroup
          display="flex"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "row",
            lg: "row",
          }}
          alignItems="center"
          justifyContent="center"
          height="50vh"
          gap={{ base: 50, sm: 100, md: 250, lg: 430 }}
          marginBottom="0"
        >
          <Button
            textColor="black"
            height={{ base: 50, sm: "70px", md: 100, lg: 110 }}
            width={{ base: 280, sm: 300, md: 200, lg: 280 }}
            fontSize={{ base: 22, sm: 20, md: 24, lg: 30 }}
            onClick={navigateToRestaurant}
          >
            Sellers
          </Button>
          <Button
            textColor="black"
            height={{ base: 50, sm: "70px", md: 100, lg: 110 }}
            width={{ base: "100%", sm: 300, md: 200, lg: 280 }}
            fontSize={{ base: 22, sm: 20, md: 24, lg: 30 }}
            onClick={navigateToCustomer}
          >
            Buyers
          </Button>
        </ButtonGroup>
      </Stack>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        // backgroundColor="rgba(0, 0, 0, 0.8)"
        // padding="1rem"
        textAlign="center"
      >
        <Slider {...settings}>
          {rentalQuotesData.map((quote, index) => (
            <Box key={index} backgroundColor="white" padding="4em">
              <Text fontSize="3xl" color="black">
                "{quote.quote}"
              </Text>
              <Text
                fontSize="xl"
                color="gray.400"
                marginTop="0.5rem"
                fontStyle="italic"
              >
                - {quote.author}
              </Text>
            </Box>
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Home;
