import React, { useEffect, useState } from 'react';
import { Box, Flex, Avatar, Input, Button, VStack, Text, HStack, useColorMode } from '@chakra-ui/react';
import UserList from './UserList';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import { useAuth } from 'auth-context/auth.context';
import GroupsApi from 'api/group';
import MessagesApi from 'api/messages';
import Pusher from 'pusher-js';
import axios from 'axios';



const Messenger = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
  let { user } = useAuth();
  useEffect(() => {

    const fetchData = async () => {
      if (selectedUser) {
        try {
          let response = await axios.get(`http://laravel-api.test/api/messages/${user.username}/${selectedUser.username}`);
          if (response.data) {
            setMessages(response.data);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    fetchData();
    const pusher = new Pusher('c8bf9e92c638cae8322c', {
      cluster: 'eu',
      forceTLS: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message.sent', function (data) {
      console.log({data});
      if ((selectedUser.username == data.sender_name && user.username == data.reciever_name) || (selectedUser.username == data.reciever_name && user.username == data.sender_name)) {
        setMessages(prevMessages => [...prevMessages, data]);

      }
    });
    channel.bind('pusher:subscription_succeeded', function () {
      console.log('Subscribed to chat channel');
    });
  
    channel.bind('pusher:subscription_error', function (status) {
      console.log('Subscription error:', status);
    });
  
    return () => {
      pusher.unsubscribe('chat');
    };
  }, [selectedUser]);
  const sendMessage = async () => {
    // e.preventDefault();
    await axios.post('http://laravel-api.test/api/send-message', { message ,sender_name:user.username,reciever_name:selectedUser.username});
    setMessage('');
};
useEffect(()=>{
console.log(messages);
},[messages])

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="6px 0px 22px 0px" >
            <Flex direction='row' justify={"space-between"}w={"full"}> 
              <Text fontSize="xl" fontWeight="bold">
              Purchase Table
              </Text>
         
            </Flex>
          </CardHeader>
          <CardBody>
          <Flex h="100vh" bg="gray.800" color="white" w={"100%"}>
            {/* Sidebar */}
            <Box w="300px" bg="gray.700">
                <UserList onSelectUser={setSelectedUser} />
            </Box>

            {/* Main Chat Area */}
            <Flex direction="column" flex="1">
                {/* Header */}
                <Flex justify="space-between" align="center" p="4" bg="gray.900">
                <Text fontSize="2xl">{selectedUser ? selectedUser.username : 'Messenger'}</Text>
                </Flex>

                {/* Messages */}
                <VStack flex="1" overflowY="auto" spacing="4" p="4">
                {messages.map(msg => {
                        return(
                            
                                <HStack
                                key={msg.id}
                                alignSelf={msg.sender_name !== user.username ? 'flex-start' : 'flex-end'}
                                bg={msg.sender_name !== user.username ? 'blue.500' : 'green.500'}
                                borderRadius="md"
                                p="3"
                                maxW="80%"
                                >
                                <Avatar size="sm" name={msg.sender_name !== user.username ?msg.sender_name:user.username} />
                                <Box>
                                    <Text fontSize="sm">{msg.sender_name !== user.username ?msg.sender_name:user.username}</Text>
                                    <Text>{msg.message}</Text>
                                </Box>
                                </HStack>
                            
                        )
                })}
                </VStack>

                {/* Message Input */}
                {
                    selectedUser&&(
                        <Flex p="4" bg="gray.900" align="center">
                <Input placeholder="Type a message..." bg="gray.700" border="none" mr="4" value={message} onChange={(e)=>{
                    setMessage(e.target.value)
                }}/>
                <Button colorScheme="blue" onClick={()=>{
                    sendMessage()
                }}>Send</Button>
                </Flex>
                    )
                }
            </Flex>
            </Flex>
</CardBody>
        </Card>
      </Flex>
  
  );
};

export default Messenger;
