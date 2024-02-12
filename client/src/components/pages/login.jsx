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
import Service from "../service/service";

export default function Login() {
  return (
    <ChakraProvider>
      <Box
        p={6}
        rounded="md"
        w={64}
        border={"2px solid #FE5000"}
        borderRadius="20px"
        width={"80%"}
      >
        <Formik
          // bg="#23252d"
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              const requestToLogin = await Service("login", values);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel
                    color="black"
                    htmlFor="text"
                    fontSize={"20px"}
                    fontWeight="800"
                  >
                    Логин
                  </FormLabel>
                  <Field
                    as={Input}
                    color="black"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Введите логин"
                    // variant="filled"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel
                    color="black"
                    htmlFor="password"
                    fontSize={"20px"}
                    fontWeight="800"
                  >
                    Пароль
                  </FormLabel>
                  <Field
                    as={Input}
                    placeholder="Введите пароль"
                    id="password"
                    name="password"
                    type="password"
                    // variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 3) {
                        error = "Password must contain at least 3 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="orange" width="full">
                  Войти
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
}
