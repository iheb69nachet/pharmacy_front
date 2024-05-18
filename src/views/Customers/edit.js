import React, { useEffect, useState } from 'react'
import {
    Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select,Text,Flex, useColorMode
  } from '@chakra-ui/react'
  import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
  import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import CustomersAPi from '../../api/cutomers';
import { Routes, Route, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCustomer = () => {
    let { id } = useParams();
    const [user,setUser]=useState(null)
    const fetchUser = async () => {
      try {
        const response=await CustomersAPi.fetchCustomer(id)
        setUser(response.data.data);
      } catch (error) {
        
      } finally {
        // setLoading(false);
      }
    };
    useEffect(() => {
    
        fetchUser();
      }, []);
      const validationSchema = Yup.object({
        first_name: Yup.string().required('First name is required'),
        last_name: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        company: Yup.string().required('Username is required'),
      });
      const filterUnchangedFields = (original, updated) => {
        let filtered = {};
        for (let key in updated) {
                if (updated[key] !== original[key]) {
                    filtered[key] = updated[key];
                }
        }
        return filtered;
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log(values);
            const updatedValues = filterUnchangedFields(user, values);
            if (Object.keys(updatedValues).length > 0) {
                const response = await CustomersAPi.EditCustomer(id, values);
                await fetchUser()
                toast(response.data.message)
                console.log('Form submitted successfully', response.data);
            } else {
                console.log('No changes to submit');
                toast('No changes to submit')
            }
      
        } catch (error) {
            if(error.response){

                toast.error(error.response.data.message)
            }else{
                toast.error(error.message)
            }
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
                    Edit Customer {"<<"}{user?.name}{">>"}
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
                {
                    user&&(

                    <Formik
                        initialValues={{ first_name: user.first_name, email: user.email, last_name: user.last_name, company: user.company }}
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
                    )
                }
                </Flex>
            </CardBody>
        </Card>
      
    </Flex>
  )
}

export default EditCustomer