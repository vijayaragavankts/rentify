import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { State } from "../../Context/Provider";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Urls";

const CreateNewItem = () => {
  const { hotel } = State();
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bathroom, setBathroom] = useState();
  const [bedroom, setBedroom] = useState();
  const [image, setImage] = useState("");
  const [newHotel, setNewHotel] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("restaurantId")) {
      navigate("/");
    }
    const storedHotel = JSON.parse(localStorage.getItem("hotelInfo"));
    setNewHotel(storedHotel);
  }, []);

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

  const submitHandler = async () => {
    if (!place || !price || !area || !bedroom || !bathroom) {
      return toast({
        title: "Please fill all the required fields",
        duration: 2000,
        status: "warning",
        isClosable: true,
        position: "right bottom",
      });
    }

    try {
      const config = {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${newHotel.data.token}`,
        },
      };
      const sellerId = localStorage.getItem("restaurantId");
      const data = await axios.post(
        `${URL}/getItemsfromSeller`,
        { place, price, area, bedroom, bathroom, image, sellerId },
        config
      );
      console.log(data);
      toast({
        title: "Item Sent to DB Successfully",
        duration: 2000,
        status: "success",
        isClosable: true,
        position: "top",
      });
      navigate("/sellerMain");
      return;
    } catch (err) {
      console.error("Error in submitHandler:", err); // Add this line for logging
      toast({
        title: "Error Occured",
        description: err.response ? err.response.data.message : "Unknown error",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Container maxW="xl">
        <VStack spacing="5px">
          <Text fontSize="4xl" marginBottom={5}>
            Create New Property
          </Text>
          <FormControl id="name" isRequired>
            <FormLabel> Property Location </FormLabel>{" "}
            <Input
              placeholder="Ex. Chennai"
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              value={place}
            ></Input>
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel> Property Area </FormLabel>
            <Input
              placeholder="Ex. Anna Nagar"
              onChange={(e) => {
                setArea(e.target.value);
              }}
              value={area}
            ></Input>
          </FormControl>
          <FormControl id="price" isRequired>
            <FormLabel> Property Rent </FormLabel>
            <Input
              placeholder="Enter Rent of Property (per month)"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            ></Input>
          </FormControl>
          <FormControl id="category" isRequired>
            <FormLabel> Bedroom </FormLabel>
            <Input
              placeholder="Enter no of bedroom available"
              onChange={(e) => {
                setBedroom(e.target.value);
              }}
              value={bedroom}
            ></Input>
          </FormControl>
          <FormControl id="bath" isRequired>
            <FormLabel> Restroom </FormLabel>
            <Input
              placeholder="Enter no of Bathroom available"
              onChange={(e) => {
                setBathroom(e.target.value);
              }}
              value={bathroom}
            ></Input>
          </FormControl>
          <FormControl id="image" isRequired>
            <FormLabel>Upload Item Image </FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            ></Input>
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Save
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default CreateNewItem;
