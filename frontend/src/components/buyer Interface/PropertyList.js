import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { State } from "../../Context/Provider";
import { Link, useNavigate } from "react-router-dom";
import image from "../../image/location-pin.png";
import cartImage from "../../image/trolley.png";
import { URL } from "../../Urls";
import Loader from "../Loader";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const PropertyList = ({ searchTerm, sortOrder }) => {
  const { user, setLikes, likes } = State();
  const [restaurantDetail, setRestaurantDetail] = useState([]);
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState(null); // State for seller details modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (!storedUser) {
      navigate("/buyers");
    } else {
      setNewUser(storedUser);
    }
  }, [navigate]);

  const fetchAll = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newUser.data.token}`,
        },
      };
      const { data } = await axios.get(`${URL}/showItemsToBuyer`, config);
      const likesData = await axios.get(`${URL}/api/getLikes`, config); // Fetch likes for the user
      const updatedData = data.data.map((item) => {
        const likedItem = likesData.data.find(
          (like) => like.itemId === item._id
        );
        return {
          ...item,
          isLiked: likedItem ? likedItem.isLiked : false,
          likesCount: item.likesCount || 0,
        };
      });
      setRestaurantDetail(updatedData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInterestedClick = async (item) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));

      if (!userData) {
        console.error("User data not found in localStorage");
        // Handle the case where user data is missing (optional)
        return;
      }

      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newUser.data.token}`,
        },
      };

      // Fetch seller details from the API based on item's seller ID
      const response = await axios.get(
        `${URL}/sellerDetails/${item.seller}`,
        config
      );
      const sellerData = response.data;

      // Set seller details and update state efficiently using a callback
      setSellerDetails((prevSellerDetails) => ({
        ...prevSellerDetails,
        ...sellerData,
      }));

      // Handle emails after state update using a separate async function
      handleEmails(sellerData, userData);

      // Open modal to show seller details (assuming you have a modal component)
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching seller details:", err);
    }
  };

  const handleEmails = async (sellerData, userData) => {
    try {
      const buyerMessage = `Thanks for showing interest in our properties. Here are the details of the seller:
    * First Name: ${sellerData.name}
    * Last Name: ${sellerData.lastname}
    * Email: ${sellerData.email}
    * Phone Number: ${sellerData.number}`;

      const sellerMessage = `Someone showed interest in your property. Here are the buyer's details:
    * First Name: ${userData.data.name}
    * Last Name: ${userData.data.lastname}
    * Email: ${userData.data.email}
    * Phone Number: ${userData.data.number}`;

      if (userData.data.email) {
        await Promise.all([
          sendEmail(sellerData.name, sellerData.email, sellerMessage),
          sendEmail(userData.data.name, userData.data.email, buyerMessage),
        ]);

        toast({
          title: "Emails sent successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error("User email not available for sending emails.");
        // Handle the case where user email is missing (optional)
      }

      // Display success toast for both emails sent
    } catch (error) {
      console.error("Error sending emails:", error);

      // Display error toast for any email sending issue
      toast({
        title: "An error occurred while sending emails",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const sendEmail = (toName, toEmail, message) => {
    // Assuming you have emailjs configured with your service ID
    return emailjs.send(
      "service_59payva", // Replace with your service ID
      "template_mmuyczk", // Replace with your template ID
      {
        to_name: toName,
        to_email: toEmail,
        message: message,
      },
      "Te3VLj2v179L0p9Ch" // Replace with your user ID
    );
  };

  const handleLikeClick = async (itemId) => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newUser.data.token}`,
        },
      };
      const updatedDetail = restaurantDetail.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likesCount: item.isLiked
              ? item.likesCount - 1
              : item.likesCount + 1,
          };
        }
        return item;
      });

      setRestaurantDetail(updatedDetail);

      // Send like/unlike request to server
      await axios.post(
        `${URL}/api/updateLike`,
        {
          itemId,
          isLiked: !restaurantDetail.find((item) => item._id === itemId)
            .isLiked,
        },
        config
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (newUser) {
      fetchAll();
    }
  }, [newUser]);

  useEffect(() => {
    if (restaurantDetail && restaurantDetail.length > 0) {
      setLoading(false);
    }
  }, [restaurantDetail]);

  const filteredAndSortedRestaurants = restaurantDetail
    .filter((item) =>
      item.place.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compareResult =
        sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      return compareResult;
    });

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" minHeight="400px">
          <Loader />
        </Flex>
      ) : (
        <Flex justify="center" wrap="wrap" p={4}>
          {filteredAndSortedRestaurants.map((item) => (
            <Box
              key={item._id}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              boxShadow="base"
              transition="transform 0.3s, box-shadow 0.3s"
              // _hover={{
              //   transform: "scale(1.05)",
              //   boxShadow: "lg",
              // }}
            >
              <div className="image-container" style={{ position: "relative" }}>
                <Image
                  src={
                    item.image
                      ? item.image
                      : "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt={item.name}
                  borderRadius="lg"
                />
                <div
                  className="verification-badge"
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    left: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "25px",
                    fontSize: "0.8rem",
                  }}
                >
                  <span
                    className="verified-text"
                    style={{ marginRight: "5px", fontSize: "0.9rem" }}
                  >
                    Verified
                  </span>
                  <FaCheck style={{ fontSize: "1rem" }} />
                </div>
                <div
                  className="heart-badge"
                  style={{
                    position: "absolute",
                    top: "0.2rem",
                    right: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "25px",
                    fontSize: "1rem",
                  }}
                >
                  <button
                    className={`like-button ${item.isLiked ? "liked" : ""}`}
                    onClick={() => handleLikeClick(item._id)}
                    style={{ fontSize: "2rem", position: "relative" }}
                  >
                    {item.isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
                    <span
                      className="like-count"
                      style={{
                        fontSize: "1rem",
                        position: "absolute",
                        top: "2rem", // Adjust this value as needed
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {item.likesCount}
                    </span>
                  </button>
                </div>
              </div>
              <Box p={6}>
                <Text
                  fontSize="5xl"
                  fontWeight="bold"
                  fontFamily={"Dancing Script"}
                >
                  {item.place}
                </Text>

                <Text fontSize="3xl" color="gray.600" fontFamily="Long Cang">
                  {`${item.area}`}
                </Text>

                <Flex justify={"space-between"}>
                  <Flex flexDirection={"column"}>
                    <Flex align="center" mt={2}>
                      <FaBath color="gray.600" style={{ fontSize: "30px" }} />
                      <Text fontSize="md" color="gray.600" ml={2}>
                        {item.no_of_bathroom}
                      </Text>
                    </Flex>
                    <Flex align="center" mt={2}>
                      <FaBed color="gray.600" style={{ fontSize: "30px" }} />
                      <Text fontSize="md" color="gray.600" ml={2}>
                        {item.no_of_bedroom}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex align="center" mt={2}>
                    <FaRupeeSign />
                    <Text fontSize="lg" color="gray.600" ml={2}>
                      {`${item.price} /month`}
                    </Text>
                  </Flex>
                </Flex>
                <Flex justify={"center"}>
                  <Button
                    bg="red.600"
                    color="white"
                    _hover={{ bg: "red.500" }}
                    _active={{ bg: "red.400" }}
                    fontSize="lg"
                    px={6}
                    py={4}
                    mt={4}
                    borderRadius="md"
                    shadow="md"
                    onClick={() => handleInterestedClick(item)}
                  >
                    I'm Interested
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Seller Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render seller details */}
            {sellerDetails && (
              <>
                <Text>First Name: {sellerDetails.name}</Text>
                <Text>Last Name: {sellerDetails.lastname}</Text>
                <Text>Email: {sellerDetails.email}</Text>
                <Text>Number: {sellerDetails.number}</Text>
                {/* Add more seller details as needed */}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PropertyList;
