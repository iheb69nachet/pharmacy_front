import React, { useEffect, useState } from 'react';
import { VStack, Avatar, Box, Text, HStack } from '@chakra-ui/react';
import UsersApi from 'api/users';
import { toast } from 'react-toastify';



const UserList = ({ onSelectUser }) => {
    const [users,setUsers]=useState([])
    const fetchUsers = async () => {
        try {
          const response=await UsersApi.fetchUsers()
          setUsers(response.data.data);
        } catch (error) {
          toast.error(error.response.data.message)
          
        } finally {
        }
      };
   
      useEffect(() => {
        fetchUsers();
      }, []);
  return (
    <VStack align="stretch" p="4" bg="gray.700" h="100%">
      {users.map(user => (
        <HStack
          key={user.id}
          p="2"
          _hover={{ bg: 'gray.600' }}
          cursor="pointer"
          borderRadius="md"
          onClick={() => onSelectUser(user)}
        >
          <Avatar name={user.username} src={user.avatar} />
          <Box>
            <Text>{user.username}</Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  );
};

export default UserList;
