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
import UsersApi from '../../api/users';
import { Routes, Route, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditUser = () => {
    let { id } = useParams();
    const [user,setUser]=useState(null)
    const fetchUser = async () => {
      try {
        const response=await UsersApi.fetchUser(id)
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
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        role: Yup.string().required('Role is required'),
      });
      const filterUnchangedFields = (original, updated) => {
        let filtered = {};
        for (let key in updated) {
            if(key=="role"){
                // filtered[key]=updated[key][]
                if (updated[key] !== original[key][0]) {
                    filtered[key] = updated[key];
                }
            }else{

                if (updated[key] !== original[key]) {
                    filtered[key] = updated[key];
                }
            }
        }
        return filtered;
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log(values);
            const updatedValues = filterUnchangedFields(user, values);
            if (Object.keys(updatedValues).length > 0) {
                const response = await UsersApi.EditUser(id, updatedValues);
                await fetchUser()
                toast(response.data.message)
                console.log('Form submitted successfully', response.data);
            } else {
                console.log('No changes to submit');
                toast('No changes to submit')
            }
      
        } catch (error) {
            toast.error(error.response.data.message)

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
                    Edit User {"<<"}{user?.name}{">>"}
                </Text>
                <Link to={"/admin/users"}>
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
                        initialValues={{ username: user.username, email: user.email, password: user.password, role: user.role[0] }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        >
                        {({ isSubmitting }) => (
                         <Flex direction='column' justify={"space-between"} w={"full"}>
                            
                            <Form >
                            <Box mb={4}>
                                <Field name="username">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                                    <FormLabel htmlFor="username">Username</FormLabel>
                                    <Input {...field} id="username" placeholder="Username" />
                                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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
                                <Field name="password">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input {...field} id="password" placeholder="Password" type="password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                                </Field>
                            </Box>

                            <Box mb={4}>
                                <Field name="role">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.role && form.touched.role}>
                                    <FormLabel htmlFor="role">Role</FormLabel>
                                    <Select {...field} id="role" placeholder="Select role">
                                        <option value="admin" >Admin</option>
                                        <option value="responsable">Responsable</option>
                                        <option value="employe">Employe</option>
                                    </Select>
                                    <FormErrorMessage>{form.errors.role}</FormErrorMessage>
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

export default EditUser