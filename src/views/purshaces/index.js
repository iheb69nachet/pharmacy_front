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

    import PurchasesApi from "../../api/purchases";
  
  const Purchases = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchUsers = async () => {
      try {
        const response=await PurchasesApi.FetchPurchases()
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
              Purchase Table
              </Text>
              <Link to={"add/purchases"}>
                <Button colorscheme='blue'>
                  Ajouter
                </Button>
              </Link>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" pt={{ base: "120px", md: "75px" }} w={"full"}>
                  
                <Table variant="simple" color={textColor}>
                <Thead>
                    <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th pl="0px" color="gray.400">
                        id
                    </Th>
                    <Th color="gray.400">products</Th>
                    <Th color="gray.400">total price</Th>
                    <Th color="gray.400">date</Th>
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
                        //   link={"edit/user/"}
                        //   deleteFunction={UsersApi.DeleteUser}
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
                {/* <Charts/>  */}
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  
  export default Purchases;
  