import React, { useEffect, useState } from "react";
import "../../../src/App.css";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { State } from "../../Context/Provider";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Urls";
import Loader from "../Loader"; // Import the Loader component

import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

const ItemsDisplayRestaurant = ({ searchTerm, sortOrder }) => {
  const { hotel, restaurantId, setRestaurantId, isInRestaurantMain } = State();
  const [itemDetail, setItemDetail] = useState([]);
  const [newHotel, setNewHotel] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!localStorage.getItem("restaurantId")) {
      navigate("/");
    }
    const storedHotel = JSON.parse(localStorage.getItem("hotelInfo"));
    setNewHotel(storedHotel);
  }, []);

  const fetchAllItems = async () => {
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newHotel.data.token}`,
        },
      };
      const id = localStorage.getItem("restaurantId");
      console.log(id);
      const { data } = await axios.get(
        `${URL}/showItemsToSeller/${id}`,
        config
      );
      console.log(data.data);
      setItemDetail(data.data);
      setLoading(false); // Set loading to false after fetching items
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAndSortedItems = itemDetail
    .filter((item) =>
      item.place.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compareResult =
        sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      return compareResult;
    });

  useEffect(() => {
    fetchAllItems();
  }, [searchTerm, sortOrder, hotel, navigate, newHotel]);

  // Logic for modal , edit and delete

  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedroom, setBedroom] = useState();
  const [bathroom, setBathroom] = useState();
  const [image, setImage] = useState("");
  const [localImage, setLocalImage] = useState("");
  const [temp, setTemp] = useState(false);

  useEffect(() => {
    // Set initial values when selectedItem changes
    if (selectedItem) {
      if (temp) {
        setPlace(selectedItem.place);
        setPrice(selectedItem.price);
        setArea(selectedItem.area);
        setBathroom(selectedItem.no_of_bathroom);
        setBedroom(selectedItem.no_of_bedroom);
        setLocalImage(selectedItem.image || "");
        setTemp(false);
      } else {
        setPlace(place);
        setPrice(price);
        setArea(area);
        setBedroom(bedroom);
        setBathroom(bathroom);
        setLocalImage(image);
      }
    }
  }, [selectedItem, image]);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
    setTemp(true);
    setImage("");
  };
  const onClose = () => {
    setIsOpen(false);
    setTemp(false);
    // setName("");
    // setPrice("");
    // setDescription("");
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = async (itemId) => {
    if (!itemId) {
      return toast({
        title: "Cant able to Delete! Try Again",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newHotel.data.token}`,
        },
      };

      const data = await axios.delete(
        `${URL}/deleteItem/${itemId}/delete`,
        config
      );
      if (data) {
        toast({
          title: "Item Deleted Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        fetchAllItems();
      }
    } catch (err) {}
  };

  const postDetails = async (pics) => {
    try {
      if (pics === undefined) {
        throw new Error("Please select an Image");
      }

      if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
        throw new Error("Please select a valid Image");
      }

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "food-app");
      data.append("cloud_name", "vijayaragavan");

      const toastId = toast({
        title: "Uploading Image...",
        status: "info",
        duration: null,
        isClosable: false,
        position: "bottom",
      });

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/vijayaragavan/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const imageData = await response.json();

      toast.update(toastId, {
        title: "Image Uploaded Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setImage(imageData.url.toString());
    } catch (err) {
      console.error(err);

      toast({
        title: "Image Upload Failed",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!place || !price || !area || !bedroom || !bathroom) {
      return toast({
        title: "Fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,

        position: "bottom",
      });
    }
    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newHotel.data.token}`,
        },
      };
      const id = localStorage.getItem("restaurantId");
      const itemId = selectedItem._id;
      console.log(itemId);
      const data = await axios.put(
        `${URL}/getItemsfromSeller/`,
        {
          place,
          price,
          area,
          image,
          bedroom,
          bathroom,
          itemId,
        },
        config
      );
      console.log(data);
      if (data) {
        setIsOpen(false);
        fetchAllItems();
      }
      toast({
        title: "Updated Successfully",
        status: "success",
        duration: 1500,
        isClosable: true,

        position: "bottom",
      });
    } catch (err) {
      console.log(err);
      return toast({
        title: "Error Occurred in Update Modal",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      {loading ? (
        <Flex justify="center" alignItems="center" height="100vh">
          <Loader />
        </Flex>
      ) : (
        <Flex justify="center" wrap="wrap" p={4}>
          {filteredAndSortedItems.map((item) => (
            <Box
              key={item._id}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m={4}
              boxShadow="base"
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
              }}
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
                    style={{ fontSize: "2rem", position: "relative" }}
                  >
                    {<FaHeart color="red" />}
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
                    {/* <MdAttachMoney color="gray.600" /> */}
                    <FaRupeeSign />
                    <Text fontSize="lg" color="gray.600" ml={2}>
                      {`${item.price} /month`}
                    </Text>
                  </Flex>
                </Flex>

                <Flex justify="space-around" align="center" mt={4}>
                  <EditIcon
                    fontSize="2xl"
                    color="green.500"
                    cursor="pointer"
                    _hover={{ color: "green.700" }}
                    onClick={() => handleEdit(item)}
                  />
                  <DeleteIcon
                    fontSize="2xl"
                    color="red.500"
                    cursor="pointer"
                    _hover={{ color: "red.700" }}
                    onClick={() => handleDelete(item._id)}
                  />
                </Flex>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isRequired>
                <FormLabel>Name of Item</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Name of Item"
                  onChange={(e) => setPlace(e.target.value)}
                  value={place}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Price of Item"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Area</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Area for Property"
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>No of Bedroom</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter no of bedroom"
                  onChange={(e) => setBedroom(e.target.value)}
                  value={bedroom}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>No of Bathroom</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter no of bathroom"
                  onChange={(e) => setBathroom(e.target.value)}
                  value={bathroom}
                />
              </FormControl>

              <FormControl id="pic" mt={4}>
                <FormLabel>Upload Item Image</FormLabel>
                <Box mb={4}>
                  <Image
                    src={localImage}
                    alt="Selected Item"
                    borderRadius="lg"
                  />
                </Box>
                <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                mt={4}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemsDisplayRestaurant;
