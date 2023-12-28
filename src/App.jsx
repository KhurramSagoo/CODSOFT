import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
const App = () => {
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
    console.log(data);
  };

  return (
    <Center py={5}>
      <form action="" onSubmit={handleSubmit(onSubmit)} type="submit">
        <FormControl my={5} isInvalid={errors.userName ? true : false}>
          <FormLabel color="teal">user name</FormLabel>
          <Input
            type="text"
            placeholder="user name..."
            {...register("userName")}
          />
          <FormErrorMessage>
            {errors.userName && errors.userName.message}
          </FormErrorMessage>
          {/* <p>{errors.userName && errors.userName.message}</p> */}
        </FormControl>
        <FormControl my={5} isInvalid={errors.email ? true : false}>
          <FormLabel color="teal">email</FormLabel>

          <Input
            type="email"
            placeholder="user@email.com"
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my={5} isInvalid={errors.password ? true : false}>
          <FormLabel color="teal">password</FormLabel>

          <Input
            type="password"
            placeholder="password..."
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my={5} isInvalid={errors.confirmPassword ? true : false}>
          <FormLabel color="teal">confirmPassword</FormLabel>

          <Input
            type="password"
            placeholder="confirmPassword..."
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
        <Button colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
    </Center>
  );
};

export default App;
