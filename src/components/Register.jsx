import React from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig/firebase";
import { useNavigate } from "react-router-dom";
// import LOGIN from "../utils/Routes";

const Register = () => {
  // const auth = getAuth(
  const toast = useToast();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    userName: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Do something with the user, if needed
      console.log("User created:", user);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
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

  return (
    <Center w="100%" h="100vh" bg="#2D3748">
      <Box bg="#CBD5E0" maxW="md" w="100%" padding="30px" margin="25px">
        <Text fontSize="2rem" fontWeight="700" textAlign="center">
          Sign Up
        </Text>
        <Text fontSize="1.2rem" textAlign="center" fontWeight="500">
          Fill the form to get registered.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl my={5} isInvalid={errors.userName ? true : false}>
            <FormLabel>User Name:</FormLabel>
            <Input
              type="text"
              placeholder="user name..."
              {...register("userName")}
            />
            <FormErrorMessage>
              {errors.userName && errors.userName.message}
            </FormErrorMessage>
          </FormControl>
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
          <FormControl my={5} isInvalid={errors.confirmPassword ? true : false}>
            <FormLabel>Confirm Password:</FormLabel>
            <Input
              type="password"
              placeholder="Confirm Password..."
              {...register("confirmPassword")}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            bg="#2D3748"
            color="white"
            _hover={{ background: "#F7FAFC", color: "black" }}
            type="submit"
            w="full"
            onClick={onSubmit}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Register;
