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
  SimpleGrid
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import { hasPermission } from "helpers/permission";
import SalesApi from "../../api/sales";
import Charts from "./charts";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      const response=await SalesApi.FetchSales()
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
        <CardBody>
              <Charts/> 
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Dashboard;
