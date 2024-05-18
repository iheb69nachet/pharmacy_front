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
import axios from 'api';
import CustomersApi from '../../api/cutomers';
import React, { useEffect, useState } from 'react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import { tablesProjectData, tablesTableData } from "variables/general";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import { hasPermission } from "helpers/permission";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response=await CustomersApi.fetchCustomers()
      setUsers(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message)
      
    } finally {
      setLoading(false);
    }
  };
  const Notify=(message)=>{
    toast(message)
  }
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
              Customers Table
            </Text>
            <Link to={"add/customers"}>
              <Button colorscheme='blue'>
                Ajouter
              </Button>
            </Link>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" color="gray.400">
                  id
                </Th>
                <Th color="gray.400">Username</Th>
                <Th color="gray.400">Email</Th>
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
                    link={"edit/customer/"}
                    deleteFunction={CustomersApi.DeleteCustomer}
                    refetch={fetchUsers}
                    Notify={Notify}
                    key={row.id}
                    permission={hasPermission("edit users")}
                   
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

export default Customers;
