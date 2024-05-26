import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Urls";

const Signup = () => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [show, setShow] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  // clearing localStorage
  // localStorage.clear();

  const handleClick = () => {
    setShow(!show);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const submitHandler = async () => {
    const loadingToastId = toast({
      title: "Connecting to the server...",
      duration: null, // Set duration to null for indefinite duration
      status: "info",
      isClosable: false,
      position: "top",
    });

    if (
      !name ||
      !email ||
      !lastname ||
      !number ||
      !password ||
      !confirmpassword
    ) {
      toast({
        title: "Please fill all the required fields",
        duration: 2000,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      toast.close(loadingToastId);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords not match",
        duration: 2000,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      toast.close(loadingToastId);
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email address",
        duration: 2000,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      toast.close(loadingToastId);
      return;
    }

    if (!validatePhoneNumber(number)) {
      toast({
        title: "Invalid phone number. Please enter exactly 10 digits.",
        duration: 2000,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      toast.close(loadingToastId);
      return;
    }

    try {
      const data = await axios.post(`${URL}/seller/register`, {
        name,
        lastname,
        email,
        number,
        password,
      });
      console.log(data);
      toast({
        title: "Registered Successfully",
        duration: 2000,
        status: "success",
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("hotelInfo", JSON.stringify(data));
      localStorage.setItem("restaurantId", data.data.id);
      navigate("/sellerMain");
      toast.close(loadingToastId);

      return;
    } catch (err) {
      toast({
        title: "Error Occured",
        description: err.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      toast.close(loadingToastId);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel> First Name </FormLabel>{" "}
        <Input
          placeholder="Enter Your First Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        ></Input>
      </FormControl>
      <FormControl id="lastName" isRequired>
        <FormLabel> Last Name </FormLabel>{" "}
        <Input
          placeholder="Enter Your Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastname}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        ></Input>
      </FormControl>

      <FormControl id="number" isRequired>
        <FormLabel>Phone Number </FormLabel>
        <Input
          placeholder="Enter Your Phone Number"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          value={number}
        ></Input>
      </FormControl>

      <FormControl id="password2" isRequired>
        <FormLabel> Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel> Confirm Password </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            value={confirmpassword}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
