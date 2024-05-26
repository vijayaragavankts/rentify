import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import LoginSeller from "./Seller Authentication/Login";
import SignupSeller from "./Seller Authentication/Signup";

const SellersHome = () => {
  return (
    <div>
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text
            align="center"
            color="black"
            fontSize="4xl"
            fontFamily="work sans"
          >
            Seller Page
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab width="50%"> Login </Tab> <Tab width="50%"> Sign Up </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginSeller />
              </TabPanel>
              <TabPanel>
                <SignupSeller />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default SellersHome;
