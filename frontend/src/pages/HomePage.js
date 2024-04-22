import React, { useEffect } from 'react'
import { Container, Box, Text, Image, Flex } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('userInfo'));

      if (user) {
          history.push("/chats");
      }
  }, [history]);

  return (

    <Container maxW='xl' centerContent>
      <Box display="flex" justifyContent="center" padding={4} bg={"snow"} w="100%" m="5em 0 15px 0" borderRadius="lg" borderWidth="1px" opacity="1">
        <Flex alignItems="center">
          { <Image src="https://img.icons8.com/arcade/64/chat.png" alt="chat" boxSize={50} mr={2} /> }
          <Text fontSize="4xl" color="#040D40" fontWeight="bold" fontFamily="'Pacifico', cursive">
            Chat Sync
          </Text>
        </Flex>
      </Box>

      <Box bg="snow" width="100%" padding={5} borderRadius="lg" color="black" borderWidth="1px" opacity="1">
        <Tabs variant='soft-rounded'>
          <TabList mb="1em">
            <Tab _selected={{ color: 'black', bg: 'blue.200' }} width="50%">Login</Tab>
            <Tab _selected={{ color: 'black', bg: 'green.200' }} width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
};

export default HomePage;