import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Select,
  Input,
  Box,
  Text,
  useColorModeValue,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import ProductsApi from '../../api/products';
import CustomersApi from '../../api/cutomers';
import SalesApi from 'api/sales';

const AddSales = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const [productOptions, setProductOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);

  const fetchProducts = async () => {
    const request = await ProductsApi.fetchproducts();
    setProductOptions(request.data.data);
  };

  const fetchCustomers = async () => {
    const request = await CustomersApi.fetchCustomers();
    setCustomerOptions(request.data.data);
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let data= {
        customer_id: values.customer,
        products: values.products.map((product) => ({
          product_id: product.product,
          quantity: product.qty,
        }))}
      let request=await SalesApi.AddSales(data)
    
      alert('Sale created successfully');
      resetForm();
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Failed to create sale');
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const initialValues = {
    customer: '',
    products: [{ product: '', qty: 1 }],
  };

  const validationSchema = Yup.object({
    customer: Yup.string().required('Customer is required'),
    products: Yup.array().of(
      Yup.object({
        product: Yup.string().required('Product is required'),
        qty: Yup.number()
          .min(1, 'Quantity must be at least 1')
          .required('Quantity is required')
          .test('max-quantity', 'Quantity exceeds available stock', function (value) {
            const product = productOptions.find(
              (product) => product.id === parseInt(this.parent.product)
            );
            return value <= (product ? product.qty : 0);
          }),
      })
    ),
  });

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Box overflowX={{ sm: 'scroll', xl: 'hidden' }} p={4} bg="gray.100" borderRadius="lg" boxShadow="lg">
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb={4}>
          Add Sale
        </Text>
        {productOptions.length > 0 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => {
              const selectedProducts = values.products.map((product) => product.product);
              const availableProducts = productOptions.filter(
                (product) => !selectedProducts.includes(product.id.toString())
              );

              return (
                <Form>
                  <Stack spacing={4}>
                    <Select
                      name="customer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Select Customer"
                    >
                      {customerOptions.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.first_name} {customer.last_name}
                        </option>
                      ))}
                    </Select>
                    {errors.customer && touched.customer ? (
                      <Text color="red.500">{errors.customer}</Text>
                    ) : null}
                    <FieldArray name="products">
                      {({ push, remove }) => (
                        <>
                          {values.products.map((product, index) => {
                            const selectedProduct = productOptions.find(
                              (p) => p.id.toString() === product.product
                            );
                            const maxQuantity = selectedProduct ? selectedProduct.qty : 0;

                            return (
                              <Flex key={index} alignItems="center">
                                <Select
                                  name={`products[${index}].product`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Select Product"
                                  value={product.product}
                                  mr={2}
                                >
                                  {productOptions.map((option) => (
                                    <option
                                      key={option.id}
                                      value={option.id}
                                      disabled={selectedProducts.includes(option.id.toString())}
                                    >
                                      {option.name}
                                    </option>
                                  ))}
                                </Select>
                                <Input
                                  type="number"
                                  name={`products[${index}].qty`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Quantity"
                                  value={product.qty}
                                  width="100px"
                                  mr={2}
                                  max={maxQuantity}
                                  min={1}
                                />
                                <IconButton
                                  aria-label="Remove product"
                                  icon={<DeleteIcon />}
                                  onClick={() => remove(index)}
                                />
                                {errors.products &&
                                errors.products[index] &&
                                errors.products[index].product &&
                                touched.products &&
                                touched.products[index] &&
                                touched.products[index].product ? (
                                  <Text color="red.500" ml={2}>
                                    {errors.products[index].product}
                                  </Text>
                                ) : null}
                                {errors.products &&
                                errors.products[index] &&
                                errors.products[index].qty &&
                                touched.products &&
                                touched.products[index] &&
                                touched.products[index].qty ? (
                                  <Text color="red.500" ml={2}>
                                    {errors.products[index].qty}
                                  </Text>
                                ) : null}
                              </Flex>
                            );
                          })}
                          <Button
                            leftIcon={<AddIcon />}
                            onClick={() => push({ product: '', qty: 1 })}
                            mt={4}
                            isDisabled={availableProducts.length === 0}
                          >
                            Add Product
                          </Button>
                        </>
                      )}
                    </FieldArray>
                    <Box mt={4}>
                      <Text fontSize="lg" fontWeight="bold">
                        Total Price: $
                        {values.products.reduce((total, product) => {
                          const productData = productOptions.find(
                            (p) => p.id === parseInt(product.product)
                          );
                          return total + (productData ? productData.price * product.qty : 0);
                        }, 0)}
                      </Text>
                    </Box>
                    <Button type="submit" colorScheme="blue">
                      Submit
                    </Button>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        )}
      </Box>
    </Flex>
  );
};

export default AddSales;
