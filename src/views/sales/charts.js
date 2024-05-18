import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import SalesApi from '../../api/sales';

const Charts = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const [data, setData] = useState({
    product_count: 0,
    customer_count: 0,
    total_income: 0,
    best_selling_products: [],
  });

  const fetchData = async () => {
    try {
      const response = await SalesApi.Stats()
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Box p={4} bg="gray.100" borderRadius="lg" boxShadow="lg">
    
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Text fontSize="lg" fontWeight="bold">Total Products</Text>
            <Text fontSize="2xl">{data.product_count}</Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">Total Customers</Text>
            <Text fontSize="2xl">{data.customer_count}</Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">Total Income</Text>
            <Text fontSize="2xl">${data.total_income}</Text>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">Best Selling Products</Text>
            <BarChart width={500} height={300} data={data.best_selling_products}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales by product" fill="#8884d8" />
            </BarChart>
          </Box>
        </SimpleGrid>
      
      </Box>
    </Flex>
  );
};

export default Charts;
