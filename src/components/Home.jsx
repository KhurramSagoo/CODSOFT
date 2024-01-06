import {
  Heading,
  Button,
  Center,
  Box,
  useToast,
  Container,
  Stack,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import { LOGIN } from "./utils/Routes";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Home = () => {
  const somePostObject = {
    title: "Sample Title",
    user: "John Doe",
    date: "2023-01-01",
    views: 100,
    detail: "This is the main content of the blog post.",
    moreDetail: "Additional details about the blog post.",
  };

  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(null);

  const handleSignOut = async () => {
    toast({
      title: "Loading!",
      description: "Wait! you are going to log out.",
      status: "loading",
      isClosable: true,
      position: "top",
      duration: 3000,
    });
    try {
      signOut(auth);

      navigate("/login");
      toast({
        title: "User Log out successfully!",
        description: "Wait! you are going to Login Page",
        status: "info",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const auth = getAuth();
  // signOut(auth).then(() => {
  //   // Sign-out successful.
  // }).catch((error) => {
  //   // An error happened.
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        setUser(user);
      } else {
        // No user is signed in.
        setUser(null);
        navigate("/login");
      }
    });

    return () => {
      // Unsubscribe the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Container w="100%">
        <Box maxW="lg" w="100%" padding="30px" margin="25px">
          <Stack>
            <Heading>You are at home page!</Heading>
            {user ? (
              <p>Welcome, {user.email}!</p>
            ) : (
              <p>You are not logged in.</p>
            )}
          </Stack>

          <SimpleGrid column={{ base: 1, md: 2, lg: 3 }}>
            <GridItem py={10}>
              {/* <SinglePost post={somePostObject} /> */}
              {/* <CreatePost /> */}
            </GridItem>
          </SimpleGrid>

          <SimpleGrid column={{ base: 1, md: 2, lg: 3 }}>
            <GridItem rowGap={10}>{/* <GetPostDB /> */}</GridItem>
          </SimpleGrid>

          <Button
            bg="#2D3748"
            color="white"
            _hover={{
              background: "#F7FAFC",
              color: "black",
            }}
            onClick={handleSignOut}
            w="full"
          >
            Log out
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
