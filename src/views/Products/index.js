// Chakra imports
import {
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProductsApi from "../../api/products";
import { toast } from "react-toastify";

const Products = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Notify=(message)=>{
    toast(message)
  }
  const fetchUsers = async () => {
    try {
      const response=await ProductsApi.fetchproducts()
      setUsers(response.data.data);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchUsers();
  }, []);

  const textColor = useColorModeValue("gray.700", "white");


  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px" >
          <Flex direction='row' justify={"space-between"}w={"full"}> 
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Products Table
            </Text>
            <Link to={"add/products"}>
              <Button colorscheme='blue'>
                Ajouter
              </Button>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody overflowX="auto">
          <Table variant="simple" color={textColor} overflowX={"scroll"} w={"100%"}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  id
                </Th>
                <Th color="gray.400">name</Th>
                <Th color="gray.400">image_path</Th>
                <Th color="gray.400">description</Th>
                <Th color="gray.400">price</Th>
                <Th color="gray.400">quantity</Th>
                <Th color="gray.400">type</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                users.map(row=>{
                  console.log(row);
                  return(
                    <TablesTableRow
                    item={row}
                    link={"edit/product/"}
                    deleteFunction={ProductsApi.Deleteproduct}
                    refetch={fetchUsers}
                    Notify={Notify}

                    key={row.id}
                   
                  />
                  )
                })
              }
            
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Products;
