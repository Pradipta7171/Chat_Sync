import React, { useState } from 'react'
import './Signup.css'
import { Button, Input, InputGroup, InputRightElement, Select, Spinner } from '@chakra-ui/react'
import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [status, setStatus] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory();

    const handleClick = () => setShow(!show)

    const handleChange = (e) => {
        setGender(e.target.value);
    };

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: 'Please Select an Image!',
                description: "You haven't selected any image to upload. Please select an image and try again.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/jpg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chatapp-preset");
            data.append("cloud_name", "pradipto");
            axios.post("https://api.cloudinary.com/v1_1/pradipto/image/upload", data)
                .then((response) => {
                    console.log("Cloudinary response:", response);
                    setPic(response.data.url.toString());
                    setLoading(false);
                    toast({
                        title: "Image uploaded successfully!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                })
                .catch((error) => {
                    console.log("Cloudinary error:", error);
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Please Select an Image!',
                description: "You haven't selected any image to upload. Please select an image and try again.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !gender || !password || !confirmpassword) {
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
        if (password !== confirmpassword) {
            toast({
                title: 'Passwords do not match!',
                description: "The passwords you entered do not match. Please enter the same password in both the fields and try again.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const response = await axios.post("/api/user", { name, email, gender, status, password, pic }, config);
            const { data } = response;

            toast({
                title: 'User Registered Successfully!',
                description: "You have been registered successfully.Welcome to The Chat Sync! 🎉",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");

        } catch (error) {
            toast({
                title: 'An error occurred!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            setLoading(false);
        }
    };

    const backgroundColor = gender === 'male' ? '#CECAF8' : gender === 'female' ? '#F9D7FC' : '#E3F1F6';


    return (
        <VStack spacing='7px'>
            <FormControl id='name' required={true}>
                <FormLabel>Name </FormLabel>
                <Input placeholder='Enter Your Name' backgroundColor='#E3F1F6' required={true}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id='email' required={true}>
                <FormLabel>Email address</FormLabel>
                <Input type='email' placeholder='Enter Your Email ' backgroundColor='#E3F1F6'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="gender">
                <FormLabel>Gender</FormLabel>
                <Select
                    placeholder="Select your Gender"
                    backgroundColor={backgroundColor}
                    onChange={handleChange}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </Select>
            </FormControl>

            <FormControl id='status'>
                <FormLabel>Status </FormLabel>
                <Input placeholder='Enter Your Status' backgroundColor='#E3F1F6' defaultValue='Hey there! I am using Chat Sync.'
                    onChange={(e) => setStatus(e.target.value)}
                />
            </FormControl>

            <FormControl id='password' required={true}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Password'
                        backgroundColor='#F9E4E5 '
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='confirm password' required={true}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Password'
                        backgroundColor='#F9E4E5 '
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic'>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type="file"
                    p={.5}
                    accept="image/*"
                    backgroundColor='#E3F1F6'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <button
                className="signupBtn"
                onClick={submitHandler}
                disabled={loading}
            >
                {loading ? (
                    <>
                        Loading...
                        <span className="spinner">
                            <Spinner size="sm" />
                        </span>
                    </>
                ) : (
                    <>
                        SIGN UP
                        <span className="arrow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 320 512"
                                fill="rgb(183, 128, 255)"
                            >
                                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                            </svg>
                        </span>
                    </>
                )}
            </button>

        </VStack>
    );
};

export default Signup;