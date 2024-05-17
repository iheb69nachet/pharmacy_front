import React from "react";
import { useParams ,useLocation} from 'react-router-dom';

import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Flex, Avatar, Box } from '@chakra-ui/react'


const messages = [
    {
        from: "",
        to: "",
        from_address: "",
        to_address: "",
        message: "View a summary of all your customers over the last month.",
    },
    {
        from: "",
        to: "",
        from_address: "",
        to_address: "",
        message: "View a summary of all your customers over the last month.",
    }
]

export default function DrawerExample() {
    let { email } = useLocation();

    console.log(email); 
    alert(email)
    // currentUser = Cookies.get("user")
    const currentUser = "kaushik@moneysave.io"
    return (
      <>
        <div className="message-body">
            <div className="messages">
                {
                    messages.map((message) => {
                        return (
                            <div className={message.to == currentUser ? "message-received" : "message-sent"} m={4}>
                                <div className="message-text">
                                    <Card>
                                        <CardHeader>
                                            <Flex spacing='4'>
                                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                                <Box>
                                                <Heading size='sm'>Segun Adebayo</Heading>
                                                <Text>Creator, Chakra UI</Text>
                                                </Box>
                                            </Flex>
                                            </Flex>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>{message.message}</Text>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
            <div className="main-bottom">
                <Input m={2} placeholder='Basic usage' />
                <Button m={2} colorScheme='blue'>Button</Button>
            </div>
        </div>
      </>
    )
}