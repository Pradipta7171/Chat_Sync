import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton display={{ base: "flex" }} icon={<ViewIcon color="green.900" />} onClick={onOpen} />
            )}
            <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay 
                    backdropFilter='blur(5px)'
                />
                <ModalContent height='410px'>
                    <ModalHeader
                        fontSize='40'
                        fontFamily='Work sans'
                        display='flex'
                        justifyContent='center'
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody 
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Image
                        borderRadius='full'
                        boxSize='150px'
                        src={user.pic}
                        alt={user.name}
                        />

                        <Text
                            fontSize='20px'
                            fontWeight='600'
                            color='#022C49'
                            fontFamily="Work sans"
                        >
                            Status: {user.status}
                        </Text>

                        <Text
                            fontSize='28px'
                            fontWeight='900'
                            color='#01010E '
                            fontFamily="Work sans"
                        >
                            Email: {user.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default ProfileModal;