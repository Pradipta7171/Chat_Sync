import React, { useState } from 'react';
import './Login.css';
import { Button, Input, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import { FormControl, FormLabel, VStack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory();

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
    
        if (!email || !password) {
            toast({
                title: 'Please fill all the fields!',
                description: "You haven't filled all the fields. Please fill all the fields and try again.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            setLoading(false);
            return;
        }
    
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
    
            const response = await axios.post("/api/user/login", { email, password }, config);
            const { data } = response;
    
            localStorage.setItem("userInfo", JSON.stringify(data));
    
            toast({
                title: 'Login Successful!',
                description: 'You have successfully logged in.Welcome to Chat-Sync Application 🎉🎉',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
    
            history.push("/chats");
        } catch (error) {
            toast({
                title: 'An error occurred!',
                description: 'Your Email or Password doesn\'t match with the user in the database. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <VStack spacing='9px'>
            <FormControl id='email'  required={true}>
                <FormLabel>Email address</FormLabel>
                <Input type='email' placeholder='Enter Your Email ' backgroundColor='#E3F1F6' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id='password'  required={true}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Password'
                        backgroundColor='#F9E4E5 '
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <button className="signinBtn" onClick={submitHandler} disabled={loading}>
            {loading ? (
                <>
                    Loading...
                    <span className="spinner">
                        <Spinner size="sm" />
                    </span>
                </>
            ) : (
                "Sign In"
            )}
        </button>

            <button className="guestBtn"
             onClick={() => {
                setEmail("guest@example.com");
                setPassword("123456");
             }}
            >
                Get Guest User Credentials
            </button>

        </VStack>
    )
}

export default Login;
