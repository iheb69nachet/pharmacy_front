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


  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card>
            <CardHeader>sdfds</CardHeader>
            <CardBody>
              <SocialProfileWithImage/>
              <SocialProfileWithImage/>

            </CardBody>
        </Card>
        {/* <SocialProfileWithImage/> */}
    </Flex>
   
  );
};

export default Chat;
