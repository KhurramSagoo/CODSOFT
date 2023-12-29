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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
const Register = () => {
  const toast = useToast();
  const schema = yup.object().shape({
    userName: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    // console.log(data);
  };

  //to use toast as a error notification
  // useEffect(() => {
  //   if (errors.userName) {
  //     toast({
  //       title: "Fill the user name.",
  //       description: errors.userName.message,
  //       status: "error",
  //       isClosable: true,
  //       position: "top",
  //       duration: 3000,
  //     });

  //   } else {
  //   }
  // }, [errors]);

  return (
    <Center w="100%" h="100vh" bg="#2D3748">
      <Box
        bg="#CBD5E0"
        maxW="md"
        w="100%"
        padding="30px"
        margin="25px"
        // h="100vh"
      >
        <Text fontSize="2rem" fontWeight="700" textAlign="center">
          Sign Up
        </Text>
        <Text fontSize="1.2rem" textAlign="center" fontWeight="500">
          Fill the form to get register.
        </Text>
        <form action="" onSubmit={handleSubmit(onSubmit)} type="submit">
          {/* <FormControl my={5} isInvalid={errors.userName ? true : false}>
            <FormLabel>User Name:</FormLabel>
            <Input
              type="text"
              placeholder="user name..."
              {...register("userName")}
            />
            <FormErrorMessage>
              {errors.userName && errors.userName.message}
            </FormErrorMessage>
          </FormControl> */}
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
            <FormErrorMessage
            // style={{
            //   maxWidth: "250px",
            //   height: "auto",
            // }}
            >
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          {/* <Input type="submit" /> */}
          <Button
            bg="#2D3748"
            color="white"
            _hover={{
              background: "#F7FAFC",
              color: "black",
            }}
            // _hover="#1A202C"
            type="submit"
            w="full"
          >
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Register;
