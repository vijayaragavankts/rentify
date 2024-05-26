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

// clearing localStorage
// localStorage.clear();

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const submitHandler = async () => {
    setLoading(true);

    // Show loading toast message
    const loadingToastId = toast({
      title: "Connecting to the server...",
      duration: null, // Set duration to null for indefinite duration
      status: "info",
      isClosable: false,
      position: "top",
    });

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

    if (!email || !password) {
      // Display warning toast for missing fields
      toast({
        title: "Please fill all the fields",
        duration: 4000,
        status: "warning",
        isClosable: true,
        position: "top",
      });

      setLoading(false);
      // Close the loading toast message
      toast.close(loadingToastId);
      return;
    }

    try {
      const data = await axios.post(`${URL}/buyer/login`, {
        email,
        password,
      });

      console.log(data);

      // Display success toast for login
      toast({
        title: "Login Successful",
        duration: 4000,
        status: "success",
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("customerId", data.data.id);
      setLoading(false);
      navigate("/buyerMain");

      // Close the loading toast message
      toast.close(loadingToastId);

      return;
    } catch (err) {
      // Display error toast for login failure
      toast({
        title: "Error Occurred!",
        description: err.response ? err.response.data.message : "Network error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      setLoading(false);
      // Close the loading toast message
      toast.close(loadingToastId);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="cus_name" isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        ></Input>
      </FormControl>
      <FormControl id="cus_password" isRequired>
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
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
