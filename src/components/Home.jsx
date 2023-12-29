import { Heading, Button, Center, Box, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import { LOGIN } from "./utils/Routes";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Home = () => {
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
      <Center w="100%" h="100vh" bg="#1A202C">
        <Box bg="#CBD5E0" maxW="md" w="100%" padding="30px" margin="25px">
          <Heading>You are at home page!</Heading>
          {user ? <p>Welcome, {user.email}!</p> : <p>You are not logged in.</p>}
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
      </Center>
    </>
  );
};

export default Home;
