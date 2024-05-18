import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import UsersApi from "api/users";
import { toast } from "react-toastify";

function TablesTableRow({item,link,deleteFunction,refetch,Notify,permission}) {
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const confirmDelete = async (id) => {
  
    try {
      let q=await deleteFunction(id)
      refetch()
      console.log(q.data.message);
      Notify(q.data.message)
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    
   


      <Tr>
        {Object.entries(item).map(([key, value]) => {
          if(key=="image_path"){
            return(
              <Td key={key}>
                          <Avatar src={value} w="50px" borderRadius="12px" me="18px" />

              
              </Td>
            )
          }else{
            return(
              <Td key={key}>
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight={key === "name" ? "bold" : "normal"}
                  >
                    {value}
                  </Text>
              
              </Td>
            )
          }
        })}
      {
        (permission && link && confirmDelete) &&(
          <Td>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <Link to={`${link+item.id}`}>
              <Button p="0px" bg="transparent" variant="no-hover">
                <Text
                  fontSize="md"
                  color="gray.400"
                  fontWeight="bold"
                  cursor="pointer"
                >
                  Edit
                </Text>
              </Button>
            </Link>
              <Button p="0px" bg="transparent" variant="hover"
                  onClick={() => confirmDelete(item.id)}
              >
                <Text
                  fontSize="md"
                  color="red.400"
                  fontWeight="bold"
                  cursor="pointer"
                >
                  Delete
                </Text>
              </Button>

          </Flex>
          
        </Td>
        )
      }
       
      </Tr>
  
  );
}

export default TablesTableRow;
