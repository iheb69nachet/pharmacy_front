import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Flex } from '@chakra-ui/react';
import SocialProfileWithImage from 'components/Chat/Profiles';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import DrawerExample from 'components/Chat/messages';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
    }
  };

  return (
    <Flex>
        <Card>
            <CardHeader>sdfds</CardHeader>
            <CardBody>
            <DrawerExample/>
            </CardBody>
        </Card>
        {/* <SocialProfileWithImage/> */}
    </Flex>
   
  );
};

export default Chat;
