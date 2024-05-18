import React from 'react'
import {
    Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select,Text,Flex, useColorMode
  } from '@chakra-ui/react'
  import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
  import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import CustomersApi from '../../api/cutomers';
import { ToastContainer, toast } from 'react-toastify';

const AddCustomers = () => {

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        company: Yup.string().required('Username is required'),
      });
      
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log(values);
            const response=await CustomersApi.AddCustomers(values)
        toast(response.data.message)
        } catch (error) {
        toast.error(error.response.data.message)

          console.error('Error submitting form', error);
        } finally {
          setSubmitting(false);
        }
      };
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }} width={"full"}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px" >
            <Flex direction='row' justify={"space-between"} w={"full"}> 
                <Text fontSize="xl"  fontWeight="bold"  >
                Add Customer
                </Text>
                <Link to={"/admin/customers"}>
                <Button colorscheme='red'>
                    Cancel
                </Button>
                </Link>
            </Flex>
            </CardHeader>
            <CardBody>
                <Flex direction='row' justify={"space-between"} w={"full"}> 
                    <Formik
                        initialValues={{ first_name: '', last_name: '', email: '', company: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                        {({ isSubmitting }) => (
                         <Flex direction='column' justify={"space-between"} w={"full"}>
                            
                            <Form >
                            <Box mb={4}>
                                <Field name="first_name">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.first_name && form.touched.first_name}>
                                    <FormLabel htmlFor="first_name">First name</FormLabel>
                                    <Input {...field} id="first_name" placeholder="First name" />
                                    <FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
                                    </FormControl>
                                )}
                                </Field>
                            </Box>
                            
                            <Box mb={4}>
                                <Field name="last_name">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.last_name && form.touched.last_name}>
                                    <FormLabel htmlFor="last_name">Last name</FormLabel>
                                    <Input {...field} id="last_name" placeholder="Last name" type="text" />
                                    <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                                    </FormControl>
                                )}
                                </Field>
                            </Box>
                            <Box mb={4}>
                                <Field name="email">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input {...field} id="email" placeholder="Email" type="email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                                </Field>
                            </Box>
                            <Box mb={4}>
                                <Field name="company">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.company && form.touched.company}>
                                    <FormLabel htmlFor="company">Company</FormLabel>
                                    <Input {...field} id="company" placeholder="Company" type="company" />
                                    <FormErrorMessage>{form.errors.company}</FormErrorMessage>
                                    </FormControl>
                                )}
                                </Field>
                            </Box>

                            

                            <Button mt={4} colorscheme="teal" isLoading={isSubmitting} type="submit">
                                Submit
                            </Button>
                            </Form>
                             </Flex>       
                        )}
                    </Formik>
                </Flex>
            </CardBody>
        </Card>
      
    </Flex>
  )
}

export default AddCustomers