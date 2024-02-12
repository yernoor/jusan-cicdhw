import { Formik, Field } from "formik";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
// import * as yup from "yup";
import AlertMessage from "../functions/alert";
import Service from "../service/service";

// const validationSchema = yup.object().shape({
//   password: yup
//     .string()
//     .min(8, "Минимальная длина пароля 8 символов")
//     .required("Пароль является обязательным"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Пароли не совпадают")
//     .min(8, "Минимальная длина пароля 8 символов")
//     .required("Пароль является обязательным"),
// });

export default function Registration() {
  return (
    <ChakraProvider>
      <Flex
        bg="rgba(39, 42, 51, 0.95)"
        align="center"
        justify="center"
        h="100vh"
      >
        <Box bg="#23252d" p={6} rounded="md" w={64}>
          <Formik
            initialValues={{
              login: "",

              password: "",
              validatePassword: "",
            }}
            onSubmit={async (values) => {
              try {
                const requestToRegistration = await Service("registration", {
                  username: values.login,
                  password: values.password,
                });
              } catch (error) {}
            }}
          >
            {({ values, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={!!errors.login && touched.login}>
                    <FormLabel color="white" htmlFor="text">
                      Логин
                    </FormLabel>
                    <Field
                      as={Input}
                      id="login"
                      name="login"
                      type="login"
                      bg="white"
                      validate={(value) => {
                        let error;

                        if (value.length < 1) {
                          error = "Must be filed";
                        }

                        return error;
                      }}
                      // variant="filled"
                    />
                    <FormErrorMessage>{errors.login}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel color="white" htmlFor="password">
                      Пароль
                    </FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      bg="white"
                      // variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 5) {
                          error = "Пароль должен быть больше 5ти символов!";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      !!errors.validatePassword && touched.validatePassword
                    }
                  >
                    <FormLabel color="white" htmlFor="password">
                      Подтвердите пароль
                    </FormLabel>
                    <Field
                      as={Input}
                      id="validatePassword"
                      name="validatePassword"
                      type="password"
                      bg="white"
                      // variant="filled"
                      validate={(value) => {
                        let error;

                        if (value !== values.password) {
                          error = "Пароли не совпадают!";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>
                      {errors.validatePassword}
                    </FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="orange" width="full">
                    Регистрация
                  </Button>
                  {/* <pre>
                    {JSON.stringify({ values, errors, touched }, null, 2)}
                  </pre> */}
                  {/* {console.log(
                    JSON.stringify({ values, errors, touched }, null, 2)
                  )} */}
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
