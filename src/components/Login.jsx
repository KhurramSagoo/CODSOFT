import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  Link as router,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebaseconfig/firebase";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    toast({
      title: "Loading!",
      description: "Wait! you are going to login.",
      status: "loading",
      isClosable: true,
      position: "top",
      duration: 3000,
    });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // Do something with the user, if needed
      console.log("User signed in:", user);
      toast({
        title: "success",
        description: "you are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Center w="100%" h="100vh" bg="#1A202C">
      <Box bg="#CBD5E0" maxW="md" w="100%" padding="30px" margin="25px">
        <Text fontSize="2rem" fontWeight="700" textAlign="center">
          Login
        </Text>
        <Text fontSize="1.2rem" textAlign="center" fontWeight="500">
          Fill the form to log in.
        </Text>
        <form action="" onSubmit={handleSubmit(onSubmit)} type="submit">
          <FormControl my={5} isInvalid={errors.email ? true : false}>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl my={5} isInvalid={errors.password ? true : false}>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              placeholder="Password123"
              {...register("password")}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            bg="#2D3748"
            color="white"
            _hover={{
              background: "#F7FAFC",
              color: "black",
            }}
            type="submit"
            w="full"
          >
            Login
          </Button>
          <br />
          <br />

          <Button
            bg="#2D3748"
            color="white"
            _hover={{
              background: "#F7FAFC",
              color: "black",
            }}
            w="full"
            onClick={handleRegister}
          >
            Sign up
          </Button>
          {/* <br /> */}
          {/* <br /> */}
          {/* <Link to={navigate("/register")}>Register</Link> */}
        </form>
      </Box>
    </Center>
  );
};

export default Login;
