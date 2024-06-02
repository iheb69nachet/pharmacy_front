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
import PurchasesApi from '../../api/purchases';
import { toast } from 'react-toastify';

const AddPurchase = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const [productOptions, setProductOptions] = useState([]);

  const FetchProduct = async () => {
    let request = await ProductsApi.fetchproducts();
    setProductOptions(request.data.data);
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  const initialValues = {
    products: [{ product: '', qty: 1 }],
  };

  const validationSchema = Yup.object({
    products: Yup.array().of(
      Yup.object({
        product: Yup.string().required('Product is required'),
        qty: Yup.number()
          .min(1, 'Quantity must be at least 1')
          .required('Quantity is required')
          
      })
    ),
  });

  const handleSubmit = async (values,{ setSubmitting, resetForm }) => {
    try {
      values.total_price=values.products.reduce((total, product) => {
        const productData = productOptions.find(
          (p) => p.id === parseInt(product.product)
        );
        return total + (productData ? productData.price * product.qty : 0);
      }, 0)
      let response=await PurchasesApi.AddPurchase(values);
      toast(response.data.message)
      resetForm()
    } catch (error) {
      toast.error(response.error.message)

    }
  };

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Box overflowX={{ sm: 'scroll', xl: 'hidden' }} p={4} bg="gray.100" borderRadius="lg" boxShadow="lg">
        <Text fontSize="xl" color={textColor} fontWeight="bold" mb={4}>
          Add Purchase
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

export default AddPurchase;
