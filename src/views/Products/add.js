import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Text, Flex, Textarea, Image
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import ProductsApi from '../../api/products';
import { ToastContainer, toast } from 'react-toastify';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

const DropzoneField = ({ field, form, ...props }) => {
  const [preview, setPreview] = useState(null);
  const { setFieldValue } = form;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFieldValue(field.name, acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <FormControl isInvalid={form.errors[field.name] && form.touched[field.name]}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Box
        {...getRootProps()}
        p={5}
        borderWidth={2}
        borderRadius="md"
        borderColor={isDragActive ? 'blue.500' : 'gray.200'}
        borderStyle="dashed"
        textAlign="center"
      >
        <input {...getInputProps()} name={field.name} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
      {preview && <Image src={preview} alt="Preview" mt={4} />}
      <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
    </FormControl>
  );
};

const AddProducts = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    file: Yup.mixed().required('A file is required'),
    description: Yup.string().min(6, 'description must be at least 6 characters').required('description is required'),
    price: Yup.number().required('price is required'),
    qty: Yup.number().required('quantity is required'),
    type: Yup.string().required('type is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('file', values.file);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('qty', values.qty);
    formData.append('type', values.type);

    try {
      const response = await ProductsApi.Addproducts(formData);
      toast(response.data.message);
    } catch (error) {
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
            <Text fontSize="xl" fontWeight="bold">
              Add product
            </Text>
            <Link to={"/admin/products"}>
              <Button colorScheme='red'>
                Cancel
              </Button>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction='row' justify={"space-between"} w={"full"}>
            <Formik
              initialValues={{ name: '', file: null, description: '', type: '', price: '', qty: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Flex direction='column' justify={"space-between"} w={"full"}>
                  <Form>
                    <Box mb={4}>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.name && form.touched.name}>
                            <FormLabel htmlFor="name">name</FormLabel>
                            <Input {...field} id="name" placeholder="name" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box mb={4}>
                      <Field name="file" component={DropzoneField} label="Product image" />
                    </Box>

                    <Box mb={4}>
                      <Field name="description">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.description && form.touched.description}>
                            <FormLabel htmlFor="description">description</FormLabel>
                            <Textarea {...field} id="description" placeholder="description" />
                            <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box mb={4}>
                      <Field name="price">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.price && form.touched.price}>
                            <FormLabel htmlFor="price">price</FormLabel>
                            <Input {...field} id="price" placeholder="1" type="number" />
                            <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box mb={4}>
                      <Field name="qty">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.qty && form.touched.qty}>
                            <FormLabel htmlFor="qty">quantity</FormLabel>
                            <Input {...field} id="qty" placeholder="1" type="number" />
                            <FormErrorMessage>{form.errors.qty}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box mb={4}>
                      <Field name="type">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.type && form.touched.type}>
                            <FormLabel htmlFor="type">type</FormLabel>
                            <Select {...field} id="type" placeholder="Select type">
                              <option value="admin">Admin</option>
                              <option value="responsable">Responsable</option>
                              <option value="employe">Employe</option>
                            </Select>
                            <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                      Submit
                    </Button>
                  </Form>
                </Flex>
              )}
            </Formik>
          </Flex>
        </CardBody>
      </Card>
      <ToastContainer />
    </Flex>
  );
}

export default AddProducts;
